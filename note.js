
var post = new Post()
post.title = ...
post.group = ...
post.isPublic = ...
...



// Find user's membership in group named 'Kommunikation'
var membership = api.currentUser.memberships.findOne(function(membership) {
	return membership.group._id == post.group
})
if (!membership) return alert('You\'re not a member of this group')

// var arr = ['a','b',3,'g',5].filter(function(value) {
// 	return typeof value === 'string'
// })

// User has right to post?
var hasRighToPostPost = api.currentUser.permissions.some(function(permission) {
	var isRightGroup = permission.group._id == post.group._id
	var canPostPublic = permission.title == 'POST_PUBLIC'
	var hasRighToPostPost = isRightGroup

	if (post.isPublic)
		hasRighToPostPost = hasRighToPostPost && canPostPublic

	return hasRighToPostPost
})
if (!hasRighToPostPost) return alert('You don\'t have permission to post the post')


membership.group.name
membership.isAdmin










var el = _('.hej')

if (el === void 'hej')