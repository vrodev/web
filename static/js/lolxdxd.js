document.body.style.backgroundColor = '#e6e6e6'
function addplane(){
	var plane = _('.addplane')
	var dark = _('.darkBackground')
	plane.style.display = plane.style.display === 'block' ? 'none' : 'block'
	dark.style.display = dark.style.display === 'block' ? 'none' : 'block'
}

function cleanPlane(){
	_('.imageinput').src = _('.titleinput').value = _('.bodyinput').value = ''
}

function foodLoadingError(err) {
	// TODO: Show in UI
	console.error({api:'food', err:err})}

api.food(function(err, weeks) {
	if (err) return foodLoadingError(err)

	var currentWeekNr = (new Date()).getWeek()
	var weekIndex = weeks.findIndex(function(week) {return week.nr==currentWeekNr})
	if (weekIndex<0) return foodLoadingError('Current week wasn\'t found')

	// Select day, monday next week if weekend
	var currentDayOfWeek = (new Date()).getDay()
	var isWeekend = currentDayOfWeek==0 || currentDayOfWeek==6
	if (isWeekend) {
		currentDayOfWeek = 1
		weekIndex++
		if (weekIndex>=weeks.length) return foodLoadingError('Next week wasn\'t found') }
	var week = weeks[weekIndex]

	var day = week.days.find(function(day) {return day.nr==currentDayOfWeek})
	if (!day) return foodLoadingError('Current day wasn\'t found') 

	_('.reg').innerText = day.courses.main
	_('.veg').innerText = day.courses.veg
})

//- var slides = JSON.parse('!{JSON.stringify(slides)}')

//- var arrayLength = slides.length
//- var temp
//- var pluppdia = 8
//- var bredd = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth

//- for (i = 0; i < arrayLength; i++) {
//- 	var slide = slides[i]
//- 	temp = document.createElement('div')
//- 	temp.className ="slideobject"
//- 	temp.style.backgroundImage = "url(" + slide.bild + ")"
//- 	temp.style.left = i * 100 + "%"
//- 	temp.setAttribute("onclick", "window.location.href = '" + slide.link + "'")


//- 	text = document.createElement('h1')
//- 	text.className = "bildtext"
//- 	temp.appendChild(text)
//- 	text.innerHTML = slide.text

//- 	plupp = document.createElement('div')
//- 	plupp.className = "plupp"
//- 	plupp.className += " plupp" + i
//- 	_(".slidemarker").appendChild(plupp)


//- 	_(".slide").appendChild(temp)
//- }

function addSlide(post, i) {
	if(post.isSlide){
		var slide = post

		temp = document.createElement('div')
		temp.className ="slideobject"
		temp.style.backgroundImage = "url(" + slide.imgUrl + ")"
		temp.style.left = i * 100 + "%"
		temp.setAttribute("onclick", "window.location.href = '" + slide.link + "'")

		text = document.createElement('h1')
		text.className = "bildtext"
		temp.appendChild(text)
		text.innerHTML = slide.text

		plupp = document.createElement('div')
		plupp.className = "plupp"
		plupp.className += " plupp" + i
		_(".slidemarker").appendChild(plupp)
		slideLength ++
	}
}


function addPostCard(post, i) {
	var box = document.createElement('div')
	box.className ="utskottruta box"
	box.id = i
	addTapEvent(box,doshowpost)
	_(".card-container").appendChild(box)

	var upper = document.createElement('div')
	upper.className ="utskotttop boxtop"
	box.appendChild(upper)

	var bild = document.createElement('div')
	bild.className ="utskottbild image"
	bild.style.backgroundImage = "url(" + post.imgUrl + ")"
	upper.appendChild(bild)

	var text = document.createElement('div')
	text.className = "boxtext"
	text.innerText = post.title
	box.appendChild(text)

	if (i%4 === 0) {
		box.style.marginRight = '0px'
	}
}

var slideLength = 0
Post.list(function(err, posts) {
	if (err) return alert('Kunde inte ladda posterna')
	posts.reverse().forEach(function (post, i) {
		addPostCard(post, i)
		addSlide(post, i)
	})
	_(".card-container").appendChild(_('.utskottruta.addbox'))
})

function doshowpost(){
	showpost()
}

function showpost(){
	document.getElementsByTagName("body")[0].className += ' dark-body'
	_('.postPlane').className += ' show-plane'
}

var n = 0
var ticket = setInterval(function next() {
		n++
		if(n > (slideLength - 1)){
			n = 0
		}
		_('.slide').dataset.index = n

		pluppar()

}, 5000)

function pluppar(){
	var active = ".plupp" + n
	var k = n-1

	if (k<0){
		k = slideLength - 1
		}

	var inactive = ".plupp" + k
	_(inactive).style.backgroundColor = "rgba(255, 255, 255, 0)"
	_(active).style.backgroundColor = "white"
}

function plupparbak(){
	var active = ".plupp" + n
	_(active).style.backgroundColor = "white"

	var k = n + 1

	if (k > slideLength - 1){
		k = 0
	}

	var inactive = ".plupp" + k
	_(inactive).style.backgroundColor = "rgba(255, 255, 255, 0)"
	
}

function forward(){
	n++
	if(n > (slideLength - 1)){
		n = 0
	}
	_('.slide').dataset.index = n
	clearTimeout(ticket)
	pluppar()
}

function backward(){
	n = n -1
	if(n < 0){
		n = slideLength - 1
	}
	_('.slide').dataset.index = n
	clearTimeout(ticket)
	plupparbak()
}

_('.main-content').style.background = 'none'
_('.main-content').style.boxShadow = 'none'

var box = document.createElement('div')
box.className ="utskottruta box menu addbox"
addTapEvent(box,showadd)
_(".card-container").appendChild(box)

var add = document.createElement('div')
add.className ="addplusdiv"
box.appendChild(add)

function showadd(){
	document.getElementsByTagName("body")[0].className += ' dark-body'
	_('.addplane').className += ' show-plane'
}