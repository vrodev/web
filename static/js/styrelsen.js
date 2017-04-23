var parts = pageinfos.styrelsen.parts

for (i = 0; i < parts.length; i++) {
	ruta = document.createElement('div')
	ruta.className ="utskottruta styrelsenruta"
	ruta.style.backgroundColor = parts[i].color
	_('.styrelsencenter').appendChild(ruta)

	upper = document.createElement('div')
	upper.className ="utskotttop"
	upper.style.backgroundColor = parts[i].color
	ruta.appendChild(upper)

	image = document.createElement('div')
	image.className ="utskottbild"
	image.style.backgroundImage = "url(" + parts[i].image + ")" 
	upper.appendChild(image)

	header = document.createElement('h2')
	header.className ="utskottrubrik styrelsenrubrik"
	header.innerText = parts[i].title
	ruta.appendChild(header)

	text = document.createElement('div')
	text.className ="utskottinfo styrelseninfo"
	text.innerText = parts[i].ord
	text.style.backgroundColor = blendColors(parts[i].color, '#000000', 0.1)
	ruta.appendChild(text)

	shine = document.createElement('div')
	shine.className ="shine"
	ruta.appendChild(shine)
}