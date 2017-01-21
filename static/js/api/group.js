// api/group.js
// VRO Web
// Initially created by Leonard Pauli, jan 2017

var Group = APIModel('group', {init:function() {
	// id, name, members, ...
	var self = this
	
	this._setMembers = function(membersRaw) {
		self.members = membersRaw.map(function(userRaw) {
			return User(userRaw) })

		self.members.patch = function(usersToAdd, usersToRemove, callback) {
			api.patch(this._name+'/'+self.id+'/members', {}, {
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
	
	return this
}})

Group.prototype.toJSON = function() {
	return {
		id:this.id, name:this.name,
		members:this.members.map(function(u) {return u.id}) }}