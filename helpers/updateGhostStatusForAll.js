"use strict";
// updateGhostStatusForAll.js
// VRO Web
// 
// Initially created by Leonard Pauli, oct 2016


const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('./db-connect').models
const clc = require('cli-color');


const updateGhostStatusForAll = module.exports.updateGhostStatusForAll = async (function() {
	const users = await (models.User.find({catcher:{$exists:true}}).exec())
	let toSave = []
	users.forEach(user=> {
		let hasTarget = !!user.target
		let wasGhost = user.isGhost
		let shouldBecomeGhost = !hasTarget
		if (wasGhost!=shouldBecomeGhost) {
			user.isGhost = shouldBecomeGhost
			toSave.push(user)
			console.log(user.name, 'is now', shouldBecomeGhost?'a ghost':'alive')
		}
	})
	//await (models.User.saveMany(users))
})

updateGhostStatusForAll()//.then(console.log,console.log)

