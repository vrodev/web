// db-connect.js
// VRO Web
// 
// Initially created by Leonard Pauli, sep 2016


// Connect DB
// ------------------------------------------------------------------------

const mongoose = require('mongoose');

function connect(dbURL) {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(dbURL, options).connection;
}

// username:password@host:port
connect('mongodb://localhost:27017/testWeb')
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
  	var fileNameWOExt = file.substr(0,file.length - '.js'.length)
  	models[fileNameWOExt] = require(join(modelsDir, file))});

module.exports.models = models