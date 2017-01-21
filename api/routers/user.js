"use strict";
// api/user.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')
const generateSimpleCode = require('../../helpers/helpers').generateSimpleCode;


// /api
const routeMain = router=> {}


// /api/user
const route = router=> {

	router.get('/', (req, res) => {
		req.models.User.find({}).select('email').then(items=> {
			res.apiOK(items)
		}, err=> res.abortIf(err, 'Couldn\'t get users'))
	})



	router.post('/', (req, res)=> {
		const user = new req.models.User()
		user.name = req.query.name
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
		req.models.User.load(req.params.id, 'catcher.target').select('email').then((item)=> {
			res.apiOK(item)
		}, err=> res.abortIf(err, 'Couldn\'t find the user'))
	})

	router.delete('/:id', function(req, res) {
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