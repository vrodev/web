var utskott = pageinfos.ettutskott

for (i = 0; i < utskott.length; i++) {
	//utskott[i].color = blendColors(utskott[i].color,'#ffffff',0.10)

	var namespace = utskott[i].title.toLowerCase()
		.replace(/å|ä/g, 'a')
		.replace(/ö/g, 'o')
		.replace(/[^a-z1-9_-]/g, '-')

	temp = document.createElement('div')
	temp.className ="utskottruta"
	temp.style.backgroundColor = blendColors(utskott[i].color,'#000000',0.15)
	document.querySelector(".utskottfield").appendChild(temp)
	temp.setAttribute("onclick", "window.location.href = '/utskott/" + namespace + "'")

	upper = document.createElement('div')
	upper.className ="utskotttop"
	upper.style.backgroundColor = utskott[i].color
	temp.appendChild(upper)

	shine = document.createElement('div')
	shine.className ="shine"
	temp.appendChild(shine)

	bild = document.createElement('div')
	bild.className ="utskottbild"
	bild.style.backgroundImage = "url(images/" + namespace + ".png)"
	upper.appendChild(bild)

	text = document.createElement('div')
	text.className = "utskotttext"
	text.innerText = utskott[i].title
	temp.appendChild(text)
}