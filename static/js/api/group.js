// api/group.js
// VRO Web
// Initially created by Leonard Pauli, jan 2017
function addMembershipsFieldToModel(self) {
	self._setMemberships = function(membershipsRaw) {
		self.memberships = membershipsRaw.map(function(membership) {
			console.log(membership)
			membership.user = User(membership.user)
			return membership })

		self.memberships.patch = function(usersToAdd, usersToRemove, callback) {
			api.patch(this._name+'/'+self.id+'/memberships',{jsonData:{
				add: usersToAdd, remove: usersToRemove}},
				function(err, data, all) {
					if (err) return callback(err)
					self._setMemberships(data)
					callback()
				})
			}

		self.memberships.add = function(userOrUsers, callback) {
			var users = userOrUsers instanceof Array? userOrUsers: [userOrUsers]
			self.memberships.patch(users, [], callback)}
		self.memberships.remove = function(userOrUsers, callback) {
			var users = userOrUsers instanceof Array? userOrUsers: [userOrUsers]
			self.memberships.patch([], users, callback)}
	}
	self._setMemberships(self.memberships || [])
}




var Group = APIModel('group', {init:function(a) {
	// id, name, memberships, ...
	var self = this
	addMembershipsFieldToModel(self)
	return this
}})

Group.prototype.toJSON = function() {
	return {
		_id:this._id, name:this.name, about:this.about, open:this.open, type:this.type,
		memberships:this.memberships.map(function(u) {
			u.user = u.user.id
			return u}) }}