// api/user.js
// VRO Web
// Initially created by Leonard Pauli, jan 2017

var User = APIModel('user', {save:function(err, data, callback, all) {
	if (err) return callback(err)
	if (this.isCurrent) api.saveCurrentUserLocally()

	addMembershipsFieldToModel(this)

	callback()
}})

User.prototype.toJSON = function() {
	// Todo: Not DRY enough
	return {_id:this._id, name:this.name, email:this.email,

memberships:this.memberships.map(function(u) {
			u.user = u.user.id
			return u}),

	}}

User.login = function(email, pass, callback) {
	api.post(this._name+'/login', {jsonData:{email:email, pass:pass}}, function(err, data, all) {
		if (err) return callback(err)

		var user = new User(data)
		user.isCurrent = true
		api.currentUser = user
		api.saveCurrentUserLocally()

		callback(null, user)
	})}

User.logout = function(callback) {

	function signOutGoogle(callback) {
    var auth2 = gapi.auth2.getAuthInstance();
    return auth2.signOut(callback) // Promise if !callback
  }

	api.post(this._name+'/logout', function(err, data, all) {
		if (err) return callback(err)
		api.currentUser = null
		api.saveCurrentUserLocally()
		window.location.reload()
		//callback()
	})}

User.authenticate = function(options, callback) {
	api.post(this._name+'/authenticate', {jsonData: options}, function(err, data) {
		if (err) return callback(err)

		var user = new User(data)
		user.isCurrent = true
		api.currentUser = user
		api.saveCurrentUserLocally()

		callback(null, user)
	})
}