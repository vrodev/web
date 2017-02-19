"use strict";
// api/functions/authenticate.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const config = require('../../config');

var jwt = require('jwt-simple');

const GoogleAuth = require('google-auth-library');
const googleAuth = new GoogleAuth;
const googleAuthClient = new googleAuth.OAuth2(config.googleSigninClientId, '', '');


module.exports.setLoggedOut = (req, res)=> {
	req.setLogout()
}

const setLoggedIn = module.exports.setLoggedIn = (user, req, res)=> {
	// User has authenticated OK
  var maxAge = 3 * 31 * 24*60*60 * 1000
  var token = jwt.encode({
    iss: user.id,
    exp: Math.abs(new Date()) + maxAge
  }, res.app.get('jwtTokenSecret'));
  res.cookie('jwtToken', token, { maxAge: maxAge, httpOnly: true });

  req.user = user
}

module.exports.usingGoogle = (userToken, req, res)=> {
	const googleUserToken = userToken
	if (res.abortIf(!googleUserToken, 'No googleUserToken provided'))
		return;

	function loginUserFromGooglePayload(payload) {
		const userId = payload.sub
		const userEmail = payload.email

		function createUserFromGooglePayload(payload) {
			// hd: 'vrg.se',
			// email: 'leon.paul-2016@vrg.se',
			// name: 'Leonard Pauli',
			// picture: 'https://lh4.googleusercontent.com/-iY1aEtM5Yzk/AAAAAAAAAAI/AAAAAAAAAB8/VOIHLs66f6M/s96-c/photo.jpg',
			// given_name: 'Leonard',
			// family_name: 'Pauli',
			
			const user = new req.models.User()
			user.initialFullName = payload.name
			user.name = payload.given_name
			user.email = payload.email
			user.picture = payload.picture
			user.login = {}
			user.login.googleUserId = userId
			user.syncPictureFromLogin = true

			// user.loginCode = generateSimpleCode(5)
			// user.line = req.query.line
			// user.graduationYear = req.query.graduationYear

			user.save(function(err, user) {
				if (res.abortIf(err, 'Couldn\'t save the user.')) return;

				// Set login cookie
				setLoggedIn(user, req, res)

				res.apiOK(user)
			})
		}

		function tryEmailLogin() {
			req.models.User.findOne({email: userEmail}).exec((err,obj) => {
				if (res.abortIf(err, 'Error finding user.')) return;
				if (!obj) return createUserFromGooglePayload(payload);

				if (payload.picture && (!obj.picture || obj.syncPictureFromLogin)) {
					obj.syncPictureFromLogin = true
					obj.picture = payload.picture
				}

				if (!obj.name && payload.name) {
					obj.initialFullName = payload.name
					obj.name = payload.given_name
				}
				if (!obj.login) obj.login = {}
				obj.login.googleUserId = userId

				obj.save((err,user) => {
					if (res.abortIf(err, 'Error saving user')) return;
					
					// Set login cookie
					setLoggedIn(user, req, res)

					res.apiOK(user)
				})

			})
		}

		req.models.User.findOne({'login.googleUserId': userId}).exec((err,obj) => {
			if (res.abortIf(err, 'Error finding user')) return;
			if (!obj) return tryEmailLogin();
			if (payload.picture && obj.syncPictureFromLogin) {
				obj.picture = payload.picture
				obj.save((err,_obj) => {
					const user = _obj || obj
					
					// Set login cookie
					setLoggedIn(user, req, res)

					res.apiOK(user)
				})
			}
		})
		//req.models.User.findOne({email: userEmail}).exec()
	}


	googleAuthClient.verifyIdToken(
		googleUserToken,
		config.googleSigninClientId,
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
		function(e, login) {
			if (res.abortIf(e, 'Google Authentication Error'))
				return;

			var payload = login.getPayload();
			// If request specified a G Suite domain:
			//console.dir({payload,userid,login,e}, {colors:1});
			var domain = payload.hd
			if (res.abortIf(domain!='vrg.se', 'Only @vrg.se emails are allowed'))
				return;

			loginUserFromGooglePayload(payload)
		});
}