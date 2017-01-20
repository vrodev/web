"use strict";
// api/post.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {
	router.get('/posts', function(req, res) {
		let limit = req.query.limit ? parseInt(limit) : 1000

		Post.find().limit(limit).exec(function(err, result) {
			if(res.abortIf(err, `could NOT fetch ${limit} posts.`)) return;
			res.apiOK(result)
		});
	})
}


// /api/post
const route = router=> {
	router.post('/', function(req,res) {
		const title = req.body.title
		const body = req.body.body
		const isSlide = req.body.isSlide
		const group = req.body.group
		console.log(req.body)
		// if (req.user.groups.indexOf('Group') == -1) {
		// 	return api.status(403).json({error:'Unauthorized.'})
		// }
		// VALIDERA!
		const post = new req.models.Post();
		post.title = title
		post.body = body
		post.author = req.user
		post.group = group
		post.isSlide = isSlide
		post.save(function(err, post) {
			if (res.abortIf(err, 'Couldn\'t save the post')) return;
			res.apiOK(post)
		});		 
	})

}


// Register
module.exports = mainRouter=> {
  routeMain(mainRouter)

  var router = express.Router();
  route(router)
  mainRouter.use('/post', router)
}