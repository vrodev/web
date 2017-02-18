"use strict";
// api/post.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express')
const path = require('path')
const fs = require('fs')

// /api
const routeMain = router=> {}

// /api/post
const route = router=> {

	router.get('/', function(req, res) {
		let limit = req.query.limit ? parseInt(limit) : 1000

		req.models.Post.find().limit(limit).sort({updatedAt: -1}).exec(function(err, result) {
			if(res.abortIf(err, 'Couldn\'t fetch posts')) return;
			res.apiOK(result)
		});
	})

	router.get('/:id', function(req, res) {
		const id = req.params.id

		req.models.Post.findOne({_id:id}).exec(function(err, result) {
			if(res.abortIf(err, 'Couldn\'t fetch post')) return;
			res.apiOK(result)
		});
	})	


	router.post('/', function(req,res) {
		const group = req.body.group
		// if (req.user.groups.indexOf('Group') == -1) {
		// 	return api.status(403).json({error:'Unauthorized.'})
		// }
		// VALIDERA!
		const post = new req.models.Post();
		post.title = req.body.title
		post.text = req.body.text
		post.author = req.user
		post.group = group
		post.isSlide = req.body.isSlide
		post.imgUrl = req.body.imgUrl
		post.url = req.body.url
		post.save(function(err, post) {
			if (res.abortIf(err, 'Couldn\'t save the post')) return;
			res.apiOK(post)
		});		 
	})

	router.delete('/:id', function(req, res) {
		const id = req.params.id
		req.models.Post.findOneAndRemove({_id:id}, function(err) {
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
	mainRouter.use('/post', router)
}