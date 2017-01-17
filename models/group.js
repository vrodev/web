"use strict";
// Group.js
// VRO Web

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = new mongoose.Schema({
	name: String,
	leader: dbRef('User'),

	members: [dbRef('User')],
	about: String

	// status: String,
	// email: String,
	// desc: String,
	// URL: String
}, {timestamps: true});

// Register schema
module.exports = mongoose.model('Group', Schema);