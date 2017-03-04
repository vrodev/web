"use strict";
// Group.js
// VRO Web

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef(null, {typeKey:'$type'})

// Create schema
const Schema = new mongoose.Schema({
	name: String,
	memberships: [dbRef('Membership')],
	about: String,

	type: {
		$type: String,
		enum: ['UTSKOTT','KOMMITTE','GROUP'],
		default: 'GROUP'
	}

	// status: String,
	// email: String,
	// desc: String,
	// URL: String
}, {timestamps: true, typeKey: '$type'});

// Register schema
module.exports = mongoose.model('Group', Schema);