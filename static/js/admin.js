var bildInput = _('#bild')
bildInput.addEventListener('change', function(e) {
	if (!e.target || !e.target.files) return;
	var fileReference = e.target.files[0]
	if (!fileReference) return;

	var fr = new FileReader();
	fr.onload = function () {
		var fileDataURL = fr.result

		_('.image').style.backgroundImage = "url('" + fileDataURL + "')"
		_('.image').innerText = ''
		//cardCopy.querySelector('label[for=bild]').className += ' labelBild'
	}
	fr.readAsDataURL(fileReference);
})

function addgroup(){
	var g = new Group()
	g.name = _('#name').innerText
	g.about = _('#about').innerText
	g.type = _('#type').innerText
	g.color = _('#color').innerText
	g.imgUrl = _('#bild').files[0]
	g.link = _('#link').innerText
	g.open = _('#openCheckbox').checked
	g.save(console.log)
}
