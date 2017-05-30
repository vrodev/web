var kommitte = subpageinfo

_('.headertext').innerHTML = kommitte.title
_(".utskottinfo").innerHTML = kommitte.desc

if(kommitte.ord !== ''){
	text = document.createElement('h2')
	text.className ="utskottrubrik ordfarande"
	text.innerText = kommitte.ord
	_('.center').appendChild(text)

	text.style.color = kommitte.color
}