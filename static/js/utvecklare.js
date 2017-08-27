var parts = pageinfos.utvecklarepers

for (i = 0; i < parts.length; i++) {
	var namespace = parts[i].title.toLowerCase()
		.replace(/å|ä/g, 'a')
		.replace(/ö/g, 'o')
		.replace(/[^a-z1-9_-]/g, '-')

	ruta = document.createElement('div')
	ruta.className ="utskottruta styrelsenruta"
	ruta.setAttribute("onclick", "window.location.href = '/utvecklare/" + namespace + "'")
	_('.styrelsencenter').appendChild(ruta)

	upper = document.createElement('div')
	upper.className ="utskotttop"
	ruta.appendChild(upper)

	image = document.createElement('div')
	image.className ="utskottbild"
	image.style.backgroundImage = "url(/images/" + parts[i].image + ")" 
	upper.appendChild(image)
	image.style.backgroundSize = '100%'

	header = document.createElement('h2')
	header.className ="utskottrubrik styrelsenrubrik"
	header.innerText = parts[i].title
	ruta.appendChild(header)

	text = document.createElement('div')
	text.className ="utskottinfo styrelseninfo"
	text.innerText = parts[i].ord
	ruta.appendChild(text)

	shine = document.createElement('div')
	shine.className ="shine"
	ruta.appendChild(shine)
}