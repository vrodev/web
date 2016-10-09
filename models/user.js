// user.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016
// Inspired by https://github.com/madhums/node-express-mongoose-demo

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = mongoose.Schema({
	name: String,
	email: String,
	loginCode: String,

  line: String,
  graduationYear: Number,


	catcher: {
		target: dbRef('User'),
		killCode: String,
    admin: Boolean,

    paymentOption: String,
    paid: Boolean,
    paidAt: Date
	}
}, {timestamps: true}) // createdAt/updatedAt


// ---------------------------------------
// Hooks

Schema.virtual('firstName').get(function () {
  return this.name.split(' ')[0]
})

Schema.virtual('lastName').get(function () {
  return this.name.split(' ').pop()
})


// ---------------------------------------
// Hooks

Schema.pre('remove', function (next) {
	// const Imager = require('imager');
	// const config = require('../../config');
	// const imagerConfig = require(config.root + '/config/imager.js');

  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'article');

  next();
});


// ---------------------------------------
// Add schema methods (before registering)

// Schema.methods.firstName = function() {
// 	return this.name.split(' ')[0]
// }


// ---------------------------------------
// Add static methods

// eg. const await = require('asyncawait/await')
// try {var user = await models.User.find("57f838d41dc00958496a4cbb")}
// catch(e) {console.log(e)}
// or models.User.findOne({name:'Lol'}).then(
// 		user=>console.log(user),
// 		err=>console.log(err))
Schema.statics.load = function (_id) {
  return this.findOne({ _id: _id })
    //.populate('user', 'name')
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

module.exports = mongoose.model('User', Schema);