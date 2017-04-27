var kommitte = subpageinfo

_('.headertext').innerHTML = kommitte.title

_(".utskottheader").style.backgroundColor = kommitte.color
_(".utskottinfo").innerHTML = kommitte.desc

if (window.matchMedia("(max-width: 500px)").matches && _('.headertext').innerHTML !== 'Debate Society') {
	_('.utskottheadtext').style.color = kommitte.color
	//_(".utskottheader").style.backgroundColor = "transparent"
}

if(kommitte.ord !== ''){
	text = document.createElement('h2')
	text.className ="utskottrubrik ordfarande"
	text.innerText = kommitte.ord
	_('.center').appendChild(text)

	text.style.color = kommitte.color
}