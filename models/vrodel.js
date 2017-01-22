"use strict";
// Installation.js
// VRO Web
// MADE BY THE GREAT JACOB TILLY, LETS MAKE API GREAT AGAIN

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = new mongoose.Schema({
	text: String,
	sender: dbRef('user'),
	voters: [dbRef('user')],
	score: Number,
	comment: {
		to: dbRef('VrodelPost'),
	},
	comments: [dbRef('VrodelPost')]
}, {timestamps: true});

// Register schema
module.exports = mongoose.model('VrodelPost', Schema);