// api.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var api = new API('/api')

api.lol = function(name, callback) {
	this.get('lol', {
		name: name
	}, callback)
}