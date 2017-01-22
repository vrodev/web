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
	this.get('food', callback) }


// Usage:
// file: _('input[type=file]').files[0]
// callback: (err, info, all)=> {
// 		if (err) return console.error(err)
// 		if (info.warnings) info.warnings.forEach(console.warn)
// 		if (!info.files.length) return console.log('No files uploaded')
// 		console.log(info.files[0].url)
// }
api.fileUpload = function(file, callback) {
	var formData;
	if (file instanceof FormData) formData = file
	else {
		formData = new FormData()
		formData.append('file', file) }

	this.post('upload', {data:formData}, callback)}