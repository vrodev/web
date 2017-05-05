var utskott = pageinfos.ettutskott

for (i = 0; i < utskott.length; i++) {
	//utskott[i].color = blendColors(utskott[i].color,'#ffffff',0.10)

	temp = document.createElement('div')
	temp.className ="utskottruta"
	temp.style.backgroundColor = blendColors(utskott[i].color,'#000000',0.15)
	document.querySelector(".utskottfield").appendChild(temp)
	temp.setAttribute("onclick", "window.location.href = '/utskott/" + utskott[i].title.toLowerCase().replace("å","a").replace("ä","a").replace('ö','o') + "'")

	upper = document.createElement('div')
	upper.className ="utskotttop"
	upper.style.backgroundColor = utskott[i].color
	temp.appendChild(upper)

	shine = document.createElement('div')
	shine.className ="shine"
	temp.appendChild(shine)

	bild = document.createElement('div')
	bild.className ="utskottbild"
	bild.style.backgroundImage = "url(images/" + utskott[i].title.replace("å","a").replace("ä","a").replace('ö','o') + ".png)"
	upper.appendChild(bild)

	text = document.createElement('div')
	text.className = "utskotttext"
	text.innerText = utskott[i].title
	temp.appendChild(text)
}