// api/main.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var api = new API('/api')

api.currentUser = (function getLocalUser() {
	var userJSONRaw = localStorage['currentUser']
	if (!userJSONRaw) return null;
	var user = User(JSON.parse(userJSONRaw))
	user.isCurrent = true
	return user })();
api.saveCurrentUserLocally = function() {
	if (!this.currentUser) {
		delete localStorage['currentUser'];return}
	localStorage['currentUser'] = JSON.stringify(this.currentUser.toJSON())}

// Other
api.food = function(callback){
	this.get('food', {}, callback) }