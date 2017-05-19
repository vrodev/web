var utskott = subpageinfo

var namespace = utskott.title.toLowerCase()
	.replace(/å|ä/g, 'a')
	.replace(/ö/g, 'o')
	.replace(/[^a-z1-9_-]/g, '-')

_(".utskottheader").style.backgroundColor = utskott.color

_('.phonelinks').style.backgroundColor = blendColors(utskott.color, "#000000", 0.2)
if(utskott.color !== "#00000"){
	_(".phonelinks").className += " whitelinks"
}

_(".utskottinfo").innerHTML = utskott.desc

if(utskott.ord !== ''){
	text = document.createElement('h2')
	text.className ="utskottrubrik ordfarande"
	text.innerText = utskott.ord + ' är ordförande'
	_('.center').appendChild(text)

	text.style.color = utskott.color
}

bild = document.createElement('div')
bild.className ="utskottbildbottom"

if (window.matchMedia("(max-width: 500px)").matches) {

	_(".center-header").style.backgroundColor = utskott.color
	if (api.currentUser){
		var object = _('.logged-in')
		object.querySelector('.title').style.color = blendColors(utskott.color, "#ffffff", 0.9)
	}else{
		var object = _('.log')
	}
	object.style.backgroundColor = blendColors(utskott.color, "#ffffff", 0.1)

	link = document.createElement('div')
	link.className ="kommittelink"
	link.style.backgroundColor = utskott.color
	link.style.minHeight = "20px"
	_('.center').appendChild(link)
}

bild.style.backgroundColor = utskott.color
bild.style.webkitMaskBoxImage = "url('/images/" + namespace + ".png')"

_('.loggacenter').appendChild(bild)

_('.utskottheadtext').innerText = utskott.title