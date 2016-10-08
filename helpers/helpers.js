// helpers.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

// ----------------------------------------------------------------------
// Generall

module.exports.generateSimpleCode = function(count) {
	var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	var text = ""
	for (var i = 0; i<count; i++)
		text += possible[Math.floor(Math.random()*possible.length)]
	return text;
}


const async = require('asyncawait/async');
const await = require('asyncawait/await');
// const Promise = require('bluebird')
// const assert = require('assert')
// Usage: var res; if (!(res = awaitres ( asyncFn, onErrorFn ))) return;
module.exports.awaitres = function(fn, onError) { return await (async (() => {
	var res; await (fn.then(r=>res=r,onError)); return res;})())}


// ----------------------------------------------------------------------
// DB
const mongoose = require('mongoose')

module.exports.mongooseRef = function(modelName, opt) {
	return { type:mongoose.Schema.ObjectId, ref:modelName }
}