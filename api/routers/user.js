"use strict";
// api/user.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {

	router.get('/users', (req, res) => {
		if (req.query.secret!='kanelbulle') return res.send('wuut');
		async (() => {
			let users = await (req.models.User.find({}).exec())
			res.json(users)
		})()
	})

}


// /api/user
const route = router=> {

	router.get('/:id', (req, res) => {
		if (req.query.secret!='kanelbulle') return res.send('wuut');
		async (() => {
			let user = await (req.models.User.load(req.params.id, 'catcher.target'))
			res.json(user)
		})()
	})

}


// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)

  var router = express.Router();
  route(router)
	mainRouter.use('/user', router)
}