var menuVisible = false
var defaultShadow = false

function hidemenu(){
	menuVisible = !menuVisible

	_('.phonelinks').classList.toggle('visible', menuVisible)
	var mainhideStyle = _('.mainhide').style

	if (menuVisible) {
		mainhideStyle.display = "block"
		setTimeout(function(){mainhideStyle.opacity = ".7"},10)
		_('.menubutton').style.transform = "rotate(-180deg)"
		_('.creddiv').style.bottom = "0px"
		_('.creddiv').style.marginBottom = "40px"

		if(_('.topheader').classList.contains('darkheader')){
			defaultShadow = true
		}else{
			_('.topheader').classList.add('darkheader')
		}

	} else {
		mainhideStyle.opacity = "0"
		setTimeout(function(){mainhideStyle.display = "none"},200)
		_('.menubutton').style.transform = "rotate(0deg)"
		_('.creddiv').style.bottom = "-100px"
		_('.creddiv').style.marginBottom = "0px"

		if(!defaultShadow){
			_('.topheader').classList.remove('darkheader')
		}
	}
}

if (window.matchMedia("(max-width: 500px)").matches) {
	_('.credits').innerHTML = _('.credits').innerHTML.replace(/ - /g,"<br>").replace(/n, /g,"n<br>")
}
if(pageinfo){
	changeFromColor((!subpage?pageinfo.color:
		(subpageinfo?subpageinfo.color:'#222222')), (!subpage?pageinfo.image:
		(subpageinfo?subpageinfo.image:'')
	))
}