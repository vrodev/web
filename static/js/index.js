// index.js
// VRO Web
//
// Initially by Leonard Pauli, sep 2016


/*var ettplusKlickad = function() {
	var sill= document.body.querySelector(".abborre")
	sill.classList.add("icansee")

	var sill= document.body.querySelector(".sill")
	sill.classList.remove("icansee")

	var sill= document.body.querySelector(".torsk")
	sill.classList.remove("icansee")

}

var nolladKlickad = function() {
	var sill= document.body.querySelector(".sill")
	sill.classList.add("icansee")

	var sill= document.body.querySelector(".abborre")
	sill.classList.remove("icansee")

	var sill= document.body.querySelector(".torsk")
	sill.classList.remove("icansee")
}

var faqKlickad= function() {
	var sill= document.body.querySelector(".torsk")
	sill.classList.add("icansee")

	var sill= document.body.querySelector(".abborre")
	sill.classList.remove("icansee")

	var sill= document.body.querySelector(".sill")
	sill.classList.remove("icansee")


}


window.onload=function()
{
	var nollad = document.body.querySelector(".ettplus")
	nollad.classList.add("fish")
	nollad.addEventListener("click", ettplusKlickad)

	var nollad = document.body.querySelector(".nollad")
	nollad.classList.add("fish")
	nollad.addEventListener("click", nolladKlickad)

	var nollad = document.body.querySelector(".faq")
	nollad.classList.add("fish")
	nollad.addEventListener("click", faqKlickad)

	

}	*/
	

window.onload=function(){
	var classToElementMapFn = function(className) {
	return document.body.querySelector('.'+className)
}
var buttons = "ettplus,nollad,faq".split(',').map(classToElementMapFn)
var pages = "abborre,sill,torsk".split(',').map(classToElementMapFn)

var addClickListenerToButton = function(button, buttonIndex) {
	button.classList.add("fish")
	button.addEventListener('click', function () {
		pages.map(function (page, pageIndex) {
			var show = pageIndex == buttonIndex
			page.classList.toggle('icansee', show)
		})
	})
}
buttons.map(addClickListenerToButton)
}
