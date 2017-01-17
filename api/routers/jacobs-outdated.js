"use strict";

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Post = require('../../models/post');


router.post('/newpost', function(req, res) {
	var newPost = new Post();
	newPost.topic 		= req.body.topic
	newPost.postedBy  = req.body.postedby
	newPost.body 			= req.body.body
	newPost.timestamp = new Date()
	newPost.isSlide 	= req.body.isSlide

	newPost.save(function(err, savedPost) {
		if(err) {
			console.log(err);
			return res.status(500).send({status:"failed",error:"could NOT post to database, check log."})
		}
		return res.status(200).send({status:"success",newPost:savedPost});
	});
});

router.get('/posts', function(req, res) {
	let limit = req.query.limit ? parseInt(limit) : 1000

	Post.find().limit(limit).exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.status(500).send({status:"failed",message:´could NOT fetch ${limit} posts.´});
		}
		res.status(200).send({
			status:"success",
			count:result.length,
			posts:result});
	});
});

router.get('/posts/:id', function(req, res) {
	var id = req.params.id;
	Post.findOne({_id:id}, function(err, response) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status:"failed",
				message:"could NOT fetch post with id "+id+" from database."});
		}
		res.status(200).send({
			status:"success",
			response:response});
	});
});

router.post('/register', function(req, res) {
	var newuser = new User();
	newuser.username = req.body.username;
	newuser.password = req.body.password;
	newuser.firstname = req.body.firstname;
	newuser.lastname = req.body.lastname;

	newuser.save(function(err, savedUser) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status:"failed",
				error:"could NOT save user."});
		}
		
		res.status(200).send({
			status:"success",
			newuser:savedUser});
	});
});

router.delete('/delete/:id', function(req, res) {
	var id = req.params.id;
	User.findOneAndRemove({ _id:id }, function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status:"failed",
				error:"could NOT delete user, please check console."});
		}
		res.status(200).send({
			status:"success",
			message:"Successfully deleted user with ID "+id});
	});
});

router.get('/users', function(req, res) {
	User.find({}, function(err, result) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status:"failed",
				error:"could NOT list users, please check console."});
		}
		numrows = result.length;
		res.status(200).send({
			status:"success",
			count:numrows,
			users:result});
	});
});

router.get('/displayUser/:id', function(req, res) {
	var id = req.params.id;
	User.findOne({ id:id }, function(err, result) {
		if(err) {
			console.log(err);
			return res.status(500).send({status:"error",message:"could NOT fetch user details, check console."});
		}
		
		res.status(200).send({result});
	});
});

router.put('/update/:id', function(req, res) {
	var id = req.params.id;
	User.findOne({_id:id}, function(err, result) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status:"failed",
				error:"could NOT update user, please check console."});
		}

		if (req.body.username) result.username = req.body.username;
		if (req.body.password) result.password = req.body.password;
		if (req.body.firstname) result.firstname = req.body.firstname;
		if (req.body.lastname) result.lastname = req.body.lastname;

		result.save(function(err, savedObject) {
			if (err) {
				console.log(err);
				return res.status(500).send({
					status:"failed",
					error:"could NOT update user, please check console."});
			}

			console.log("Updated user.");
			res.status(200).send({
				status:"success",
				updatedUser:savedObject});
		});
	})
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	if (!username || !password)
		return res.status(400).send({
			status:"failed",
			error:"missing params, please send both username and password."});

	User.find({username:username,password:password}, function(err, foundObject) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status:"failed",
				error:"could NOT login, please check console."});
		}
		var count = foundObject.length;
		if (count != 1)
			return res.status(400).send({
				status:"failed",
				error:"invalid username or password"});
		
		// Logged in!
		var username = foundObject[0].username;
		var userid = foundObject[0]._id;
		req.session.user = username;
		return res.status(200).send({
			status:"success",
			message:`User with username ${username} (ID ${userid}) has been logged in.`});
	});
});

router.get('/logout', function(req, res) {
	if (!req.session.user)
		return res.status(400).send({
			status:"failed",
			error:"You can NOT log out as you are NOT logged in."});
	req.session.user = undefined;
	req.session.destroy();
	res.status(200).send({
		status:"success",
		message:"You are now successfully logged out."});
});

router.get('/loginstatus', function(req, res) {
	if (!req.session.user)
		return res.status(401).send({
			status:"unauthorized",
			message:"You are currently not logged in."});
	res.status(200).send({
		status:"loggedin",
		message:`You are currently logged in as ${req.session.user}.`});
});

module.exports = router;
