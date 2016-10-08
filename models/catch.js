// catch.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = mongoose.Schema({
	user: dbRef('User'),
	target: dbRef('User'),
	points: {type: Number, default: 1}
}, {timestamps: true})


// ---------------------------------------
// Add object methods

Schema.methods.firstName = function() {
	return this.name.split(' ')[0]
}


// ---------------------------------------
// Add static methods

Schema.statics.load = function (_id) {
  return this.findOne({ _id })
    //.populate('user', 'name email username')
    //.populate('comments.user')
    .exec();
}

Schema.statics.list = function(options) {
  const criteria = options.criteria || {};
  const page = options.page || 0;
  const limit = options.limit || 30;
  const sort = options.sort || { createdAt: -1 };
  return this.find(criteria)
    .populate('user', 'name')
    .sort(options.sort)
    .limit(limit)
    .skip(limit * page)
    .exec();
}


// ---------------------------------------
// Register schema

module.exports = mongoose.model('Catch', Schema);