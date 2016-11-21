"use strict";
// killNoobs.js
// VRO Web
// 
// Initially created by Leonard Pauli, nov 2016


const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('./db-connect').models
const clc = require('cli-color');


const killNoobs = module.exports.killNoobs = async (function() {

	const catches = await (req.models.Catch.find({}).exec())
	console.log('catches:',catches.length)
	const usersAlive = await (models.User.find({catcher:{$exists:true}}).exec())
	console.log('usersAlive:',usersAlive.length)
	const noobs = usersAlive.filter(user=> !catches.some(c=> c.user._id==user._id))
	console.log('noobs:',noobs.length)

	// noobs.forEach(user=> {
	// 	user.isNoobed = true
	// 	user.catcher.target = null
	// 	user.catcher.catchCode = ""
	// })

	//await (models.User.saveMany(filtered))

	console.log('make sure to run assignTargetsForAll.js!')
})

killNoobs()

