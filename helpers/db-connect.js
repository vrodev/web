// db-connect.js
// VRO Web
// 
// Initially created by Leonard Pauli, sep 2016


const mongoose = require('mongoose')
const Promise = require('bluebird')
const config = require('../config')


// Connect promise lib
// ------------------------------------------------------------------------

// According to
// http://stackoverflow.com/a/24371533/1054573
// there was some memory leak and speed issues
// with the native implementation. Thereby using 
// bluebird for now.

// Use native promises
// mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

// Use bluebird
mongoose.Promise = Promise
//assert.equal(query.exec().constructor, Promise);


// Connect DB
// ------------------------------------------------------------------------

// https://github.com/madhums/node-express-mongoose-demo
function connect(dbURL) {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(dbURL, options).connection;
}

// username:password@host:port
connect(config.db)
	.on('error', function() {
		console.error.bind(console, 'DB error:').apply(console, arguments)
	})
	.on('disconnected', connect)
	.once('open', function() {
  	console.log('Connected to DB')
  	// Todo: start express listening from here,
  	// but only after
  	// if (app.get('env') === 'test') return;
	});


// Load models
// ------------------------------------------------------------------------

const fs = require('fs');
const join = require('path').join;
const modelsDir = join(__dirname, '../models');

// Bootstrap models
var models = {}
fs.readdirSync(modelsDir)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(function(file) {
  	var fileNameWOExt = file.replace(/^(\w)(.*)(.js)/i, (wholeMatch, prefix, suffix) => prefix.toUpperCase()+suffix)
  	models[fileNameWOExt] = require(join(modelsDir, file))});

module.exports.models = models