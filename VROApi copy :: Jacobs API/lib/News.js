var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
	topic: String,
	body: String,
	postedBy: String,
	timestamp: String,
	isSlide: Boolean
});

var News = mongoose.model('news', newsSchema);
module.exports = News;