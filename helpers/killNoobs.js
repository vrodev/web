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

	const catches = await (models.Catch.find({}).exec())
	console.log('catches:',catches.length)
	const usersAlive = await (models.User.find({catcher:{$exists:true}, "catcher.target":{$exists:true}}).exec())
	console.log('usersAlive:',usersAlive.length)

	const noobs = usersAlive.filter(user=> {
		return !catches.some(c=> c.user+''==user._id+'')
	})
	console.log('of which are noobs:',noobs.length)

	noobs.forEach(user=> {
		user.catcher.isNoobed = true
		user.catcher.target = undefined
		user.catcher.catchCode = ""
	})

	await (models.User.saveMany(noobs))

	console.log('make sure to run assignTargetsForAll.js!')
})

killNoobs()
// 
// 
// 
// 


const fixFlagForkillNoobs = module.exports.fixFlagForkillNoobs = async (function() {

	const catches = await (models.Catch.find({}).exec())
	console.log('catches:',catches.length)
	const noobs = await (models.User.find({
		catcher:{$exists:true},
		"catcher.target":{$exists:false},
		"catcher.catchCode":""
	}).exec())
	console.log('noobs:',noobs.length)

	noobs.forEach(user=> {
		user.catcher.isNoobed = true
	})

	await (models.User.saveMany(noobs))
})

//fixFlagForkillNoobs()

