// catcher.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var catchWasClicked = function() {
	api.lol('Erik', function(res) {
		console.log(res)
		alert(res.message);
	})
}

var dieWasClicked = function() {
	api.sayDie('Jacob', function(res) {
		console.log(res);
		alert(res.message);
		alert(res.randomVariable);
		cycleBackground();
	})
}

function cycleBackground() {
	alert("Starting cycling of background...");
	var myVar=1;
	function actualCycle() {
		document.getElementsByTagName("html")[0].setAttribute("style","-webkit-filter: hue-rotate("+myVar+"deg) !important;");
		myVar++;
		setTimeout(actualCycle,1);
	}
	setTimeout(actualCycle,100);
}

var setupButtonAction = function() {
	var dataPage = document.body.getAttribute('data-page')
	if (dataPage=='main') {

		// Main page
		var btn = document.body.querySelector('.catch')
		btn.addEventListener('click', catchWasClicked, false)
		
	}
}

var setupButtonAction = function() {
	var dataPage = document.body.getAttribute('data-page')
	if (dataPage=='main') {

		// Main page
		var btn = document.body.querySelector('.die')
		btn.addEventListener('click', dieWasClicked, false)
		
	}
}

// Called when DOM (the html document)
// has finished loading. Eg. you can't
// access document.body before this event
window.onload = function() {
	setupButtonAction()
}