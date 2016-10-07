// catcher.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var catchWasClicked = function() {
	api.clickedKilled('Erik', function(res) {
		console.log(res)
		alert(res.message);
		document.getElementById("statustext").innerHTML = "Du dödade ditt förra offer (Erik). Ditt nya offer är Emma!";
		window.href = "http://google.se";
	})
}

var dieWasClicked = function() {
	api.clickedDied('Jacob', function(res) {
		console.log(res);
		alert(res.message);
		document.getElementById("statustext").innerHTML = "You are very dead.";
		document.getElementById("catchbutton").style.display = "none";
		document.getElementById("diebutton").style.margin = "200px 0px -140px -140px";
		document.getElementById("diebutton").style.position = "absolute";
		document.getElementById("ca").style.display = "none";
		document.getElementById("di").style.display = "none";

	})
}

var thisdoesntexistWasClicked = function() {
	api.clickedDied(function(res) {
		console.log(res);
		alert(res.message);

	})
}

var setupButtonAction = function() {
	var dataPage = document.body.getAttribute('data-page')
	if (dataPage=='main') {

		// Main page
		var btn = document.body.querySelector('.die')
		btn.addEventListener('click', dieWasClicked, false)
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