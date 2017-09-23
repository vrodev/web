var kommitte = subpageinfo

_('.headertext').innerHTML = kommitte.title

_(".utskottheader").style.backgroundColor = kommitte.color
_(".utskottinfo").innerHTML = kommitte.desc

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

	linktx.innerText = "Gå med"


	shine = document.createElement('div')
	shine.className = "shine"
	link.appendChild(shine)

	_('.ordfarande').style.color = kommitte.color
}else{
	link.style.position = "absolute"
}