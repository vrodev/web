// api/group.js
// VRO Web
// Initially created by Leonard Pauli, jan 2017

var Group = function(jsonOrId) {
	var self = this

	// id, name, members, ...
	if (typeof jsonOrId == "object") {
		Object.assign(this, jsonOrId)
	} else this.id = jsonOrId

	this._setMembers = function(membersRaw) {
		self.members = membersRaw.map(function(userRaw) {
			return User(userRaw) })

		self.members.patch = function(usersToAdd, usersToRemove, callback) {
			api.patch('group/'+self.id+'/members', {}, {
				add: usersToAdd, remove: usersToRemove},
				function(err, data, all) {
					if (err) return callback(err)
					self._setMembers(data)
					callback()
				})
			}

		self.members.add = function(userOrUsers, callback) {
			var users = userOrUsers instanceof Array? userOrUsers: [userOrUsers]
			self.members.patch(users, [], callback)}
		self.members.remove = function(userOrUsers, callback) {
			var users = userOrUsers instanceof Array? userOrUsers: [userOrUsers]
			self.members.patch([], users, callback)}
	}
	this._setMembers(this.members || [])
	
	return this}
	

Group.prototype.toJSON = function() {
	return {
		id:this.id, name:this.name,
		members:this.members.map(function(u) {return u.id}) }}
Group.prototype.save = function(callback) {
	var self = this
	api.post('group', {}, this.toJSON(), function(err, data, all) {
		if (err) return callback(err)
		callback()
	}, {}, !this.id? 'POST': 'PATCH')}

Group.list = function(callback) {
	api.get('groups', {}, function(err, data, all) {
		if (err) return callback(err)
		var items = data.map(function(d) {return new Group(d)})
		callback(null, items)
	})}
Group.load = function(id, callback) {
	api.get('group/'+id, {}, function(err, data, all) {
		if (err) return callback(err)
		var item = new Group(data)
		callback(null, item)
	})}