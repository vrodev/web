var kommitte = pageinfos.enkommitte

for (i = 0; i < kommitte.length; i++) {
	var namespace = kommitte[i].title.toLowerCase()
		.replace(/å|ä/g, 'a')
		.replace(/ö/g, 'o')
		.replace(/[^a-z1-9_-]/g, '-')

	temp = document.createElement('div')
	temp.className ="utskottruta kommitteruta"
	temp.style.backgroundColor = kommitte[i].color
	temp.setAttribute("onclick", "window.location.href = '/kommitte/" + namespace + "'")
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