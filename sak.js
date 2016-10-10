"use strict";
var models = require('./helpers/db-connect').models
//var models = require('./models/models')

// var user = new models.User({
// 	name: "Anders Johansson",
// 	loginCode: "asdfasf",
// 	email: "email"
// })

// user.loginCode = user.generateNewLoginCode()

// user.save()
// 
//user.save();


// var callback = function (users) {
// 	console.log(users.length, users[0].name)
// }
// 



// models.User.find(function() {
// 	console.log('found', arguments)
// });
// 
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const awaitres = require('./helpers/helpers').awaitres;
const Promise = require('bluebird')
const assert = require('assert')
const config = require('./config')
const helpers = require('./helpers/helpers')
const path = require('path')
const jade = require('jade')
const clc = require('cli-color');

// helpers.sendEmail('Leonard <leon.paul-2016@vrg.se>', 'Catcher 2016', 'catcher-welcome',
// 	{loginCode: 'LOOOOOOCOOOODE' }).then(console.log,console.log)



//models.User.findOne({ _id: '57f9db02d7c899e74c912ca5' }).populate('catcher.target').exec().then(console.log, console.log)
models.User.findOne({ loginCode:'WVBK6P' }).populate('catcher.target').exec().then(user=>{
	const target = user.catcher.target

	target.populate('catcher.target', (_,target)=>{ async (()=>{
		const nextTarget = target.catcher.target
		console.log(clc.bgBlue('(User caught)'), user.name, '-> (', target.name, ') ->', nextTarget.name)

		let thecatch = new models.Catch()
		thecatch.target = target._id
		thecatch.user = user
		await (thecatch.save())
	
		user.catcher.target = nextTarget._id
		target.catcher.target = null
		target.catcher.catchCode = null
		await (user.save())
		await (target.save())
	
		return nextTarget
	})().then() })
}, console.log)



/*let target = await (user.catcher.populate('target'))

	let thecatch = new Catch()
	thecatch.target = target._id
	thecatch.user = user
	await (thecatch.save())

	user.catcher.target = target.catcher.target._id
	target.catcher.target = null
	target.catcher.catchCode = ""
	await (user.save())
	await (target.save())

	return user.catcher.target*/


// models.User.find().then(console.log)
// async function lo() {
// 	var res = await models.User.find()
// 	return res	
// }

// var lo = async ((fn, onError) => {
// 	var res; await (fn.then(r=>res=r,onError)); return res;
// })
// 


// var mo = async (function() {
// 	//var res = await (lo(models.User.load("57f838d41dc00958496a4cbb"), console.log))
// 	var res = awaitres (models.User.load("57f838d41dc00958496a4cbb"), console.log)
// 	if (!res) return;
// 	console.log('Res:', res)
// })
// mo()