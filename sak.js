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




// models.User.find().then(console.log)
// async function lo() {
// 	var res = await models.User.find()
// 	return res	
// }

// var lo = async ((fn, onError) => {
// 	var res; await (fn.then(r=>res=r,onError)); return res;
// })
// 


var mo = async (function() {
	//var res = await (lo(models.User.load("57f838d41dc00958496a4cbb"), console.log))
	var res = awaitres (models.User.load("57f838d41dc00958496a4cbb"), console.log)
	if (!res) return;
	console.log('Res:', res)
})
mo()