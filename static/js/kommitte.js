var kommitte = pageinfos.enkommitte

for (i = 0; i < kommitte.length; i++) {
	temp = document.createElement('div')
	temp.className ="utskottruta kommitteruta"
	temp.style.backgroundColor = kommitte[i].color
	temp.setAttribute("onclick", "window.location.href = '/kommitte/" + kommitte[i].title.toLowerCase().replace(/ /g,"_").replace("å","a").replace("ä","a").replace('ö','o') + "'")
	document.querySelector(".utskottfield").appendChild(temp)

	text = document.createElement('p')
	text.className ="kommittetext"
	//text.style.backgroundColor = blendColors(kommitte[i].color,'#000000',0.15)
	text.innerText = kommitte[i].title
	temp.appendChild(text)

	shine = document.createElement('div')
	shine.className ="shine"
	temp.appendChild(shine)

	hov = document.createElement('div')
	hov.className ="kommittehover"
	temp.appendChild(hov)	
}