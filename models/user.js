// user.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

var mongoose = require('mongoose')

// Create schema
var UserSchema = mongoose.Schema({
	name: String,
	loginCode: String,
	email: String
})

// ---------------------------------------
// Add schema methods (before registering)

UserSchema.methods.firstName = function() {
	return this.name.split(' ')[0]
}


// ---------------------------------------
// Register schema

var User = mongoose.model('User', UserSchema);
module.exports = User