var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	id: {type: Number, unique: true},
	cardno: {type: String, unique: true},
	name: String,
	surname: String,
	email: String,
	tel: String,
	pass: String,
	userlevel: String,
	town: String,
	zip: String,
	street: String,
	class: String,
	immortal: String,
	exyear: String,
	activated: Boolean,
	pin: Number,
	headadmin: Boolean
});

var User = mongoose.model('users', userSchema);
module.exports = User;