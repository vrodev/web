var mongoose = require('mongoose');

mongoose.connect('localhost:27017/Kommitteer');

var kommitteSchema = new mongoose.Schema({
	namn: String,
	status: String,
	ordforande: String,
	email: String,
	desc: String,
	URL: String
});

var Kommitteer = mongoose.model('kommitteer', kommitteSchema);
module.exports = Kommitteer;