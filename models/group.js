"use strict";
// Group.js
// VRO Web

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = new mongoose.Schema({
	name: String,
	leader: dbRef('User'),
	administrators: [dbRef('User')],

	members: [dbRef('User')],
	about: String,

	type: {
		type: String,
		enum : ['UTSKOTT','KOMMITTE','GROUP'],
		default : 'GROUP'
	}

	// status: String,
	// email: String,
	// desc: String,
	// URL: String
}, {timestamps: true});

// Register schema
module.exports = mongoose.model('Group', Schema);