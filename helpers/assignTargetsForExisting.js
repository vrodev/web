"use strict";
// assignTargets.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016


const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('./db-connect').models
const clc = require('cli-color');



const assignTargets = module.exports.assignTargets = function(_users) {
	let users = _users.slice() // Copy
	let circleDesc = "", i=0, count = users.length
	let firstUser, lastUser;
	while (users.length>0) {
		let user = users.splice(Math.floor(Math.random()*(users.length-1)),1)[0]
		if (!lastUser) {lastUser=firstUser=user;continue;}
		lastUser.catcher.target = user._id
		circleDesc += lastUser.name+' -> '
		lastUser = user

		i++
		if (i>1) {
			process.stdout.write(clc.move.up(1));
			process.stdout.write(clc.erase.line);
		}
		console.log(clc.white('assigning targets for users ')+clc.bgBlackBright.black('('+[i,count].join('/')+')'))
	}
	console.log(circleDesc)
	return {firstUser:firstUser, lastUser:lastUser}
}

const assignNewTargetsForAllExisting = module.exports.assignNewTargetsForAllExisting = async (function() {
	const users = await (models.User.find({catcher:{$exists:true}}).exec())
	console.log('all:',users.length)
	let filtered = users.filter(user=> user.catcher.target)
	console.log('filtered:',filtered.length)
	//console.log(filtered.map(user=> user.name).join())
	const left = assignTargets(filtered)
	left.lastUser.catcher.target = left.firstUser._id
	await (models.User.saveMany(filtered))
})

assignNewTargetsForAllExisting()//.then(console.log,console.log)

