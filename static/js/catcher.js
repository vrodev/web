// catcher.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016

var elementsToBeDefined = 'statustext,catch,die'


function setupApp() {
	var ui = app.ui

	// Catch button clicked
	app.ui.catch.click = function() {
		api.clickedKilled('Erik', function(res) {
			console.log(res)
			alert(res.message);

			ui.statustext.el.innerHTML = "Du dödade ditt förra offer (Erik). Ditt nya offer är Emma!";

			window.href = "http://google.se";
		})
	}

	// Die button clicked
	app.ui.die.click = function() {
		api.clickedDied('Jacob', function(res) {
			console.log(res);
			alert(res.message);

			ui.statustext.el.innerHTML = res.messageString
			ui.catch.el.style.display = "none"
			ui.die.el.style.margin = "200px 0px -140px -140px"
			ui.die.el.style.position = "absolute"
			cycleBackground();
		})
	}

}



// ----------------------------------------------------------------------

function cycleBackground() {
	alert("Starting cycling of background...");
	setTimeout(function actualCycle(val) {
		app.ui.die.el.style.webkitFilter = "hue-rotate("+val+"deg) !important"
		app.ui.die.el.style.marginLeft = val+"px !important"
		app.ui.die.el.style.marginTop = val+"px !important"
		setTimeout(actualCycle, 1, val+1);
	}, 100, 0);
}

function allowSending() {
	document.getElementById("loginbutton").disabled = false;
}

var getEmail = function() {
	api.getEmail('',function(res) {
		alert(res.messageString);
		console.log(res.messageString);
		console.log(res);
		
		var responseString = res.messageString;
		var emails = responseString.split(";");
		
		alert(emails);
		app.ui.statustext.el.innerHTML = emails;
	})
}

var sendEmail = function() {
	api.sendEmail('',function(res) {
		alert(res.message ? res.message : ("Error:" + res.error));
	})
}

var resetCircle = function() {
	api.resetCircle('Testparameter',function(res) {
		console.log(res);
		alert(res.message ? res.message : ("Error:" + res.error));
	})
}



// ----------------------------------------------------------------------

var AppUI = function(app, elements) {
	var me = this
	this.app = app

	elementsToBeDefined.split(',').map(function(elementClass) {
		var elm = {
			el: document.getElementsByClassName(elementClass)[0],
			click: function(e) {}
		}
		elm.el.addEventListener('click', function(e) {elm.click(e)}, false)
		me[elementClass] = elm
	})

	return this
}


var app = new (function() {
	var me = this

	me.init = function() {
		me.ui = new AppUI(me)
		setupApp()
	}

	return this
})


// Called when DOM (the html document)
// has finished loading. Eg. you can't
// access document.body before this event
window.onload = function() {
	var dataPage = document.body.getAttribute('data-page')
	if (dataPage=='main') {
		// Main page
		app.init()
	}
}

// ----------------------------------------------------------------------