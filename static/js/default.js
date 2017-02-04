var menuVisible = false
function hidemenu(){
	menuVisible = !menuVisible

	_('.phonelinks').classList.toggle('visible', menuVisible)
	var mainhideStyle = _('.mainhide').style

	if (menuVisible) {
		mainhideStyle.display = "block"
		setTimeout(function(){mainhideStyle.opacity = ".9"},10)
		_('.menubutton').style.transform = "rotate(-180deg)"
		_('.creddiv').style.bottom = "0px"
	} else {
		mainhideStyle.opacity = "0"
		setTimeout(function(){mainhideStyle.display = "none"},200)
		_('.menubutton').style.transform = "rotate(0deg)"
		_('.creddiv').style.bottom = "-50px"
	}
}

if (window.matchMedia("(max-width: 500px)").matches) {
	_('.credits').innerHTML = _('.credits').innerHTML.replace(/ - /g,"<br>").replace(/n, /g,"n<br>")
}
if(pageinfo){
	changeFromColor(!subpage?pageinfo.color:
		(subpageinfo?subpageinfo.color:'#222222'))
}