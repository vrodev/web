// api/user.js
// VRO Web
// Initially created by Leonard Pauli & Jacob Tilly, jan 2017

// LETS MAKE THE API GREAT AGAIN!
// leos länk: http://www.joakimkarud.com/use-my-music/

var Post = APIModel('post')

Post.prototype.toJSON = function() {
	return {_id:this._id, title:this.title, text:this.text, author:this.author, group:this.group, url:this.url, imgUrl:this.imgUrl, prioritized:this.prioritized}}