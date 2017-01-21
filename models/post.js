"use strict";
// Post.js
// VRO Web

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = new mongoose.Schema({
	title: String,
	body: String,
	author: dbRef('User'),
	group: dbRef('Group'),
	url: String,
	imgUrl: String,

	isSlide: Boolean
}, {timestamps: true});

// Register schema
module.exports = mongoose.model('Post', Schema);