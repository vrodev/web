var models = require('./helpers/db-connect').models
//var models = require('./models/models')



var user = new models.User({
	name: "Anders Johansson",
	loginCode: "asdfasf",
	email: "email"
})

// user.loginCode = user.generateNewLoginCode()

user.save()
// 
//user.save();


// var callback = function (users) {
// 	console.log(users.length, users[0].name)
// }



models.User.find(function() {
	console.log('found', arguments)
});