// api/user.js
// VRO Web
// Initially created by Leonard Pauli, jan 2017

var User = function(jsonOrId) {
	// isCurrent, id, name, email, ...
	if (typeof jsonOrId == "object")
		Object.assign(this, jsonOrId)
	else this.id = jsonOrId
	return this}


User.prototype.toJSON = function() {
	return {id:this.id, name:this.name, email:this.email}}
User.prototype.save = function(callback) {
	var self = this
	api.post('user', {}, this.toJSON(), function(err, data, all) {
		if (err) return callback(err)
		if (self.isCurrent) api.saveCurrentUserLocally()
		callback()
	}, {}, !this.id? 'POST': 'PATCH')}

User.list = function(callback) {
	api.get('users', {}, function(err, data, all) {
		if (err) return callback(err)
		var items = data.map(function(d) {return new User(d)})
		callback(null, items)
	})}
User.load = function(id, callback) {
	api.get('user/'+id, {}, function(err, data, all) {
		if (err) return callback(err)
		var item = new User(data)
		callback(null, item)
	})}

User.login = function(email, pass, callback) {
	api.post('user/login', {}, {email:email, pass:pass}, function(err, data, all) {
		if (err) return callback(err)

		var user = User(data)
		user.isCurrent = true
		api.currentUser = user
		api.saveCurrentUserLocally()

		callback(null, user)
	})}
User.logout = function(callback) {
	api.post('user/logout', {}, {}, function(err, data, all) {
		if (err) return callback(err)
		api.currentUser = null
		api.saveCurrentUserLocally()
		callback()
	})}