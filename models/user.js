"use strict";
// user.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016
// Inspired by https://github.com/madhums/node-express-mongoose-demo

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef(null, {typeKey:'$type'})
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const clc = require('cli-color');

// Create schema
const Schema = mongoose.Schema({
  email: String,

  picture: String,
  syncPictureFromLogin: Boolean,

  //TL:DR; Vi borde ha något i stil med "Fullt Namn" (fullName),
  // "Vad kallar dina kollegor/vänner dig?" (_givenName -> givenName; default eg. first of fullName.split by space) "Initialer/förkortat namn"
  // (_tinyName -> tinyName: default eg. ($first.$last.) letter, in uppercase, of (fullName.split by space))
	fullName: String,
  name: String,
  tinyName: String,

  login: {
    googleUserId: String,
  },

  line: String,
  graduationYear: Number,

  memberships: [dbRef('Membership')],
  permissions: [{
    group: dbRef('Group'),
    title: {
      $type: String,
      enum: ['POST_PUBLIC','EDIT', 'NONE'],
      default: 'NONE'
    }
  }],

  // cardno: {type: String, unique: true},
  // name: String,
  // surname: String,
  // email: String,
  // tel: String,
  // pass: String,
  // userlevel: String,
  // town: String,
  // zip: String,
  // street: String,
  // class: String,
  // immortal: String,
  // exyear: String,
  // activated: Boolean,
  // pin: Number,
  // headadmin: Boolean


	loginCode: String,
	catcher: {
		target: dbRef('User'),
    isNoobed: Boolean,
		catchCode: String,
    admin: Boolean,

    paymentOption: String,
    paid: Boolean,
    paidAt: Date
	}
}, {timestamps: true, typeKey: '$type'}) // createdAt/updatedAt
// toObject: { virtuals: true },
// toJSON: { virtuals: true }


// Hooks

// Schema.virtual('name').get(function () {
//   if (this._name) return this._name
//   return (this.fullName || '').split(' ')[0]
// })
// Schema.virtual('tinyName').get(function () {
//   if (this._tinyName) return this._tinyName
//   return (this._tin || '').split(' ')[0]
// })
Schema.virtual('initialFullName').set(function (fullName) {
  this.fullName = fullName
  const words = fullName.split(' ')
  this.name = words[0]
  this.tinyName = (words[0][0] + (words.length<2?'': words[words.length-1][0])).toUpperCase()
})

Schema.virtual('className').get(function () {
  if (!this.line) return null;
  const lineComponents = this.line.split(' ')
  const className =
    (s=>s.substr(0,1).toUpperCase() + 
    s.substr(1).toLowerCase())(lineComponents[0]) + 
    this.graduationYear +
    (c=>c.length>1?c[1].toLowerCase():'')(lineComponents)
  return className
})


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


// Add schema methods (before registering)

// Schema.methods.firstName = function() {
// 	return this.name.split(' ')[0]
// }


// Add static methods

// eg. const await = require('asyncawait/await')
// try {var user = await models.User.find("57f838d41dc00958496a4cbb")}
// catch(e) {console.log(e)}
// or models.User.findOne({name:'Lol'}).then(
// 		user=>console.log(user),
// 		err=>console.log(err))
Schema.statics.load = function (_id,populate) {
  return this.findOne({ _id: _id }).populate(populate)
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

Schema.statics.saveMany = async (function(objs) {
  let i = 0
  objs.map(obj => {
    await (obj.save())
    
    i++
    if (i>1) {
      process.stdout.write(clc.move.up(1));
      process.stdout.write(clc.erase.line);
    }
    console.log(clc.white('saving users ')+clc.bgBlackBright.black('('+[i,objs.length].join('/')+')'))
  })
})


// Register schema
module.exports = mongoose.model('User', Schema);