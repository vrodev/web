"use strict";
// Group.js
// VRO Web

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef(null, {typeKey:'$type'})

// Create schema
const Schema = new mongoose.Schema({
	name: String,
	about: String,
	open: Boolean, // Bestämmer om medlemmar kan joina utan godkännande från behörig användare i gruppen

	type: {
		$type: String,
		enum: ['UTSKOTT','KOMMITTE','GROUP'],
		default: 'GROUP'
	}

	// status: String,
	// email: String,
	// desc: String,
	// URL: String
}, {timestamps: true, typeKey: '$type', toJSON: {virtuals: true}});



Schema.virtual('memberships', {
  ref: 'Membership',
  localField: '_id',
  foreignField: 'group'
})


// Register schema
module.exports = mongoose.model('Group', Schema);