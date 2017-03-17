function addgroup(){
	var g = new Group()
	g.name = _('#name').value
	g.about = _('#about').value
	g.type = _('#type').value
	_('#open').value?g.open=true:g.open=false
	g.save(console.log)
}
