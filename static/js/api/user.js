// api/user.js
// VRO Web
// Initially created by Leonard Pauli, jan 2017

var User = APIModel('user', {save:function(err, data, callback, all) {
	if (err) return callback(err)
	if (this.isCurrent) api.saveCurrentUserLocally()
	callback()
}})

User.prototype.toJSON = function() {
	return {id:this.id, name:this.name, email:this.email}}

User.login = function(email, pass, callback) {
	api.post(this._name+'/login', {}, {email:email, pass:pass}, function(err, data, all) {
		if (err) return callback(err)

		var user = User(data)
		user.isCurrent = true
		api.currentUser = user
		api.saveCurrentUserLocally()

		callback(null, user)
	})}
User.logout = function(callback) {
	api.post(this._name+'/logout', {}, {}, function(err, data, all) {
		if (err) return callback(err)
		api.currentUser = null
		api.saveCurrentUserLocally()
		callback()
	})}