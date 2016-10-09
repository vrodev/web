"use strict";
// catchLogic.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016


const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('./db-connect').models
const clc = require('cli-color');
const generateSimpleCode = require('./helpers').generateSimpleCode


module.exports.initializeCatchCode = async (function(user) {
	user.catcher.catchCode = generateSimpleCode(6)
	await (user.save())
	return user.catcher.catchCode
})

module.exports.tryCatch = async (function(user, catchCode) {
	let target = await (user.catcher.populate('target'))

	// Check if correct code -> catch
	if (target.catcher.catchCode!==catchCode.toUpperCase())
		return false;

	let thecatch = new Catch()
	thecatch.target = target._id
	thecatch.user = user
	await (thecatch.save())

	user.catcher.target = target.catcher.target._id
	target.catcher.target = null
	target.catcher.catchCode = ""
	await (user.save())
	await (target.save())

	return user.catcher.target
})