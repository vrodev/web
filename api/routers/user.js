"use strict";
// api/user.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express')
const generateSimpleCode = require('../../helpers/helpers').generateSimpleCode;
const authenticate = require('../functions/authenticate')


// /api
const routeMain = router=> {}


// /api/user
const route = router=> {

	router.get('/', (req, res) => {
		if (res.requiredPermissions("EDIT")) return;
		req.models.User.find({}).select('email').then(items=> {
			res.apiOK(items)
		}, err=> res.abortIf(err, 'Couldn\'t get users'))
	})

	router.post('/authenticate', (req, res)=> {
		const googleUserToken = req.body.googleUserToken
		authenticate.usingGoogle(googleUserToken, req, res)
	})

	router.post('/logout', (req, res)=> {
		authenticate.setLoggedOut(req, res)
		res.apiOK()
	})

	router.post('/', (req, res)=> {
		if (res.requiredPermissions("EDIT")) return;

		const user = new req.models.User()
		user.name = req.query.name
		user.fullName = req.query.fullInitialName
		user.email = req.query.email
		user.loginCode = generateSimpleCode(5)
		user.line = req.query.line
		user.graduationYear = req.query.graduationYear

		user.save(function(err, user) {
			if (res.abortIf(err, 'Couldn\'t save the user')) return;
			res.apiOK(user)
		});
	})

	router.get('/:id', (req, res) => {
		if (res.requiredPermissions("EDIT")) return;
		req.models.User.findOne({_id:req.params.id}).populate('memberships catcher.target').exec().then((item)=> {
			res.apiOK(item)
		}, err=> res.abortIf(err, 'Couldn\'t find the user'))
	})

	router.delete('/:id', function(req, res) {
		if (res.requiredPermissions("EDIT")) return;
		const id = req.params.id
		req.models.User.findOneAndRemove({_id:id}, function(err) {
			if (res.abortIf(err, 'Could not delete post')) return;
			res.apiOK()
		})
	})	

}


// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)

	var router = express.Router();
	route(router)
	mainRouter.use('/user', router)
}