var mongoose = require('mongoose');

mongoose.disconnect();
mongoose.connect('localhost:27017/Utskott');

var utskottSchema = new mongoose.Schema({
	namn: String,
	ordforande: String,
	medlemmar: String,
	desc: String,
	contact: String
});

var Utskott = mongoose.model('utskott', utskottSchema);
module.exports = Utskott;