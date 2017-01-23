var kommitte = subpageinfo

var num
if(kommitte.name == 'Aktiesparare'){
	kommitte.name = "aktiesparar"
}

_('.headertext').innerHTML = kommitte.name

_(".utskottheader").style.backgroundColor = kommitte.color
_(".utskottinfo").innerHTML = kommitte.desc

_('.utskottrubrik').style.color = blendColors(kommitte.color, "#000000", 0.3)

if (window.matchMedia("(max-width: 500px)").matches && _('.headertext').innerHTML !== 'Debate Society') {
	_('.utskottheadtext').style.color = kommitte.color
	//_(".utskottheader").style.backgroundColor = "transparent"
	_('.headertext').innerHTML = kommitte.name + '-<br>kommittén'
}else if(_('.headertext').innerHTML !== 'Debate Society'){
	_('.headertext').innerHTML = kommitte.name + 'kommittén'
}

if(kommitte.name == 'Östasiatisk kultur'){
	_('.headertext').innerHTML = "östasiatiska kulturkommittén"
}else if(kommitte.name == 'Harry Potter'){
	_('.headertext').innerHTML = "harry potter-kommittén (9¾)"
}

if(kommitte.ord !== ''){
	text = document.createElement('h2')
	text.className ="utskottrubrik ordfarande"
	text.innerText = kommitte.ord + ' är ordförande'
	_('.center').appendChild(text)

	text.style.color = kommitte.color
}

link = document.createElement('div')
link.className ="kommittelink"
link.style.minHeight = "20px"
link.style.zIndex = '20'
_('.center').appendChild(link)

if(kommitte.link !== ''){
	
	link.setAttribute("onclick", "window.location.href = '" + kommitte.link + "'")

	linktx = document.createElement('h2')
	linktx.className = "kommittelinktext"
	linktx.style.backgroundColor = kommitte.color
	link.appendChild(linktx)

	if(kommitte.link.indexOf("facebook") !== -1){
		linktx.innerText = "Kommitténs Facebook"
	}else if(kommitte.link.indexOf("instagram") !== -1){
		linktx.innerText = "Kommitténs Instagram"
	}else{
		linktx.innerText = "Kommitténs sociala nätverk"
	}

	shine = document.createElement('div')
	shine.className = "shine"
	link.appendChild(shine)

	_('.ordfarande').style.color = kommitte.color
}else{
	link.style.position = "absolute"
}