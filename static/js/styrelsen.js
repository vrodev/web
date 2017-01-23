var personer = pageinfos.styrelsen.personer

for (i = 0; i < personer.length; i++) {
	ruta = document.createElement('div')
	ruta.className ="utskottruta styrelsenruta"
	ruta.style.backgroundColor = personer[i].color
	_('.styrelsencenter').appendChild(ruta)

	header = document.createElement('h2')
	header.className ="utskottrubrik styrelsenrubrik"
	header.innerText = personer[i].name
	ruta.appendChild(header)

	text = document.createElement('div')
	text.className ="utskottinfo styrelseninfo"
	text.innerText = personer[i].person
	text.style.backgroundColor = blendColors(personer[i].color, '#000000', 0.1)
	ruta.appendChild(text)

	shine = document.createElement('div')
	shine.className ="shine"
	ruta.appendChild(shine)
}