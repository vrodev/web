// catcher.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var catchWasClicked = function() {
	api.lol('Erik', function(res) {
		console.log(res)
		alert(res.message);
	})
}

var setupButtonAction = function() {
	var dataPage = document.body.getAttribute('data-page')
	if (dataPage=='main') {

		// Main page
		var btn = document.body.querySelector('.catch')
		btn.addEventListener('click', catchWasClicked, false)
		
	}
}

// Called when DOM (the html document)
// has finished loading. Eg. you can't
// access document.body before this event
window.onload = function() {
	setupButtonAction()
}