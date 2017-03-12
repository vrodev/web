"use strict";
// Membership.js
// VRO Web
// 
// Initially created by Leonard Pauli, feb 2016

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = mongoose.Schema({
	group: dbRef('Group'),
	user: dbRef('User'),
	title: {type: String}
}, {timestamps: true})

// Register schema
module.exports = mongoose.model('Membership', Schema);