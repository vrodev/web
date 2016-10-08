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

			ui.statustext.el.innerHTML = res.messageString;
			ui.catch.el.style.display = "none";
			ui.die.el.style.margin = "200px 0px -140px -140px";
			ui.die.el.style.position = "absolute";
			cycleBackground();
		})
	}

	function cycleBackground() {
	alert("Starting cycling of background...");
	var myVar=1;
	function actualCycle() {
		document.getElementsByClassName("die")[0].setAttribute("style","-webkit-filter: hue-rotate("+myVar+"deg) !important;");
		document.getElementsByClassName("die")[0].setAttribute("style","margin-left: "+myVar+"px !important;");
		document.getElementsByClassName("die")[0].setAttribute("style","margin-top: "+myVar+"px !important;");
		myVar++;
		setTimeout(actualCycle,1);
	}
	setTimeout(actualCycle,100);
}


}


var resetCircle = function() {
	api.resetCircle('Testparameter',function(res) {
		console.log(res);
		alert(res.message);
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