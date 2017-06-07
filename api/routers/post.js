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

		req.models.Post.find().limit(limit).sort({createdAt: -1}).exec(function(err, result) {
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
		if (res.requiredPermissions("POST")) return;

		const group = req.body.group
		// if (req.user.groups.indexOf('Group') == -1) {
		// 	return api.status(403).json({error:'Unauthorized.'})
		// }
		// VALIDERA!
		const post = new req.models.Post();
		post.title = req.body.title
		post.subtitle = req.body.subtitle
		post.text = req.body.text
		post.author = req.user
		post.group = group
		post.prioritized = req.body.prioritized
		post.imgUrl = req.body.imgUrl
		post.url = req.body.url
		post.save(function(err, post) {
			if (res.abortIf(err, 'Couldn\'t save the post')) return;
			res.apiOK(post)
		});		 
	})


	// uppdatera grupp
	router.put('/:id', (req, res)=> {
		if (res.requiredPermissions("EDIT")) return;

		const group = req.body.group
		// if (req.user.groups.indexOf('Group') == -1) {
		// 	return api.status(403).json({error:'Unauthorized.'})
		// }
		// VALIDERA!

		const id = req.params.id;
		req.models.Post.findOne({_id:id}, function(err, post) {
			if (res.abortIf(err, 'Could not find user for handling update')) { return }

			post.title = req.body.title
			post.subtitle = req.body.subtitle
			post.text = req.body.text
			post.author = req.user
			post.group = group
			post.prioritized = req.body.prioritized
			post.imgUrl = req.body.imgUrl
			post.url = req.body.url
			
			post.save(function(err, post) {
				if (res.abortIf(err, 'Couldn\'t save the post')) return;
				res.apiOK(post)
			});
		})

	})

	router.delete('/:id', function(req, res) {
		if (res.requiredPermissions("POST EDIT".split(' '))) return;

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