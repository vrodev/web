// api/user.js
// VRO Web
// Initially created by Leonard Pauli & Jacob Tilly, jan 2017

// LETS MAKE THE API GREAT AGAIN!
// leos länk: http://www.joakimkarud.com/use-my-music/

var Post = APIModel('post')

Post.prototype.toJSON = function() {
	return {id:this.id, title:this.title, body:this.body, author:this.author, group:this.group, url:this.url, imgUrl:this.imgUrl, isSlide:this.isSlide}}


				var x = new Post()						
																											x.title = "Jacobs inlägg"
													x.body = "Jacob skriver ett inlägg! :D"
		x.save(function(err) {
																																				if (err) {
																																					console.error(err);
																																					return;
																																				}
													alert("det funka");
});