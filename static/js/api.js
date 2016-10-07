// api.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var api = new API('/api')

api.clickedKilled = function(name, callback) {
	this.get('clickedKilled', {
		name: name
	}, callback)
}

api.clickedDied = function(name, callback) {
	this.get('clickedDied', {
		name: name
	}, callback)
}

