// api/user.js
// VRO Web
// Initially created by Leonard Pauli & Jacob Tilly, jan 2017

var Post = APIModel('post')

Post.prototype.toJSON = function() {
	return {id:this.id, title:this.title, body:this.body, author:this.author, group:this.group, url:this.url, imgUrl:this.imgUrl, isSlide:this.isSlide}}


// 	title: String,
// 	body: String,
// 	author: dbRef('User'),
// 	group: dbRef('Group'),
// 	url: String,
// 	imgUrl: String,
// 	isSlide: Boolean
// }, {timestamps: true});

