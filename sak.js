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
const Promise = require('bluebird')
const assert = require('assert')

// models.User.find().then(console.log)
// async function lo() {
// 	var res = await models.User.find()
// 	return res	
// }

// var lo = async (function() {
// 	try {return await (models.User.findOne({name:'Lol'}))}
// 	catch(e) {console.log('asdf')}
// })
// lo().then(console.log)
//console.log(res)