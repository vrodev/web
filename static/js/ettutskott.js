var utskott = subpageinfo

var namespace = utskott.title.toLowerCase()
	.replace(/å|ä/g, 'a')
	.replace(/ö/g, 'o')
	.replace(/[^a-z1-9_-]/g, '-')

_(".utskottinfo").innerHTML = utskott.desc

if(utskott.ord !== ''){
	text = document.createElement('h2')
	text.className ="utskottrubrik ordfarande"
	text.innerText = utskott.ord + ' är ordförande'
	_('.center').appendChild(text)

	text.style.color = utskott.color
}

if (window.matchMedia("(max-width: 500px)").matches) {

	
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

_('.utskottheadtext').innerText = utskott.title