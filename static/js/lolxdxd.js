/*document.body.style.backgroundColor = '#e6e6e6'
*/
_('.extendHeader').classList.add('extendHeader-main')

if(api.currentUser) _('.add-card-hidden').style.display = 'block'

if (window.innerWidth > 500){
	_('.main-content').style.top = '80px'
	_('.topheader').style.height = '80px'
	_('.topheader').style.boxShadow = 'none'
	_('.topheader').style.background = 'transparent'

	var links = document.querySelectorAll('.link')
	links.forEach(function(element){
		element.classList.add('subtle-link')
	})
}else{
	document.body.style.backgroundColor = '#f1f1f1'
	document.querySelector('.topheader').style.boxShadow = '0px 0px 5px rgba(0,0,0,0.3)'
}

function addplane(){
	var plane = _('.addplane')
	var dark = _('.darkBackground')
	plane.style.display = plane.style.display === 'block' ? 'none' : 'block'
	dark.style.display = dark.style.display === 'block' ? 'none' : 'block'
}

function cleanPlane(){
	_('.imageinput').src = _('.titleinput').innerHTML = _('.textinput').innerHTML = ''
}

function foodLoadingError(err) {
	// TODO: Show in UI
	console.error({api:'food', err:err})
}

var foodColor = /*'#00b3ab' */ pageinfos.mat.color

_('.card.menu').style.backgroundColor = blendColors(foodColor, '#ffffff', 0.1)
_('.vegstamp>.text').style.color = foodColor
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

	_('.weekday').innerText = day.name
	var date = new Date(day.date)
	_('.monthday').innerText = date.getDate()
	_('.reg').innerText = day.courses.main
	_('.veg').innerText = day.courses.veg
})

var slideLength = 0
function addSlide(post, first) {
	var slide = _('.template.slideobject')

	slide = slide.cloneNode(true)
	_('.slide').appendChild(slide)
	slide.classList.remove('template')

	slide.querySelector('.image').style.backgroundImage = "url(" + post.imgUrl + ")"
	slide.style.left = slideLength * 100 + "%"

	slide.querySelector('.title').innerHTML = post.title
	slide.querySelector('.text').innerHTML = post.text

	addTapEvent(slide, function() {
		LightBoxClick(slide, 'slideobject')
	})

	var plupp = document.createElement('div')
	plupp.className = "plupp"
	plupp.className += " plupp" + slideLength
	_(".slidemarker").appendChild(plupp)
	if(first) plupp.style.backgroundColor = "white"
	slideLength++
}

if(api.currentUser){
	addTapEvent(_('.add-card'), function() {
		document.body.classList.add('lightbox-visible')
		var lightbox = _('body > .overlay .lightbox')

		var cardCopy = _('.add-card').cloneNode(true)
		cardCopy.classList.toggle('add-card-hidden')
		cardCopy.classList.add('item')
		cardCopy.classList.remove('card')
		addTapEvent(cardCopy.querySelector('.chooseSlide'),defineType)

		var publishButton = cardCopy.querySelector('.publish.add-choice')
		addTapEvent(publishButton, function() {
			addObject(cardCopy)
		})

		var bildInput = cardCopy.querySelector('input.imageinput')
		bildInput.id = 'bild'
		if (bildInput) {
			bildInput.addEventListener('change', function(e) {
				if (!e.target || !e.target.files) return;
				var fileReference = e.target.files[0]
				if (!fileReference) return;

				var fr = new FileReader();
				fr.onload = function () {
					var fileDataURL = fr.result

					cardCopy.querySelector('label[for=bild]').style.backgroundImage = "url('" + fileDataURL + "')"
					cardCopy.querySelector('label[for=bild]').innerText = ''
					//cardCopy.querySelector('label[for=bild]').className += ' labelBild'
				}
				fr.readAsDataURL(fileReference);
			})
		}


		lightbox.appendChild(cardCopy)
	})
}

function addPostCard(post, i) {
	var card = _('.card.template')

	card = card.cloneNode(true)
	_('.card-container').appendChild(card)
	card.classList.remove('template')

	card.dataset.id = post._id
	addTapEvent(card, function() {
		LightBoxClick(card, 'card')
	})

	var bild = card.querySelector('.image')
	bild.style.backgroundImage = "url(" + post.imgUrl + ")"

	var title = card.querySelector('.title')
	title.innerText = post.title

	var text = card.querySelector('.text')
	text.innerText = post.text

	if(post.title.length == 0){
		card.querySelector('.info').style.margin = 0
	}
}

function LightBoxClick(item, className){
	document.body.classList.add('lightbox-visible')
	var lightbox = _('body > .overlay .lightbox')

	var cardCopy = item.cloneNode(true)
	cardCopy.classList.add('item')
	cardCopy.classList.remove(className)
	cardCopy.removeAttribute("style")

	if(api.currentUser){
		addTapEvent(cardCopy.querySelector('.remove'), function(){
			console.log('försöker ta bort')
			var post = new Post(cardCopy.dataset.id)
			post.delete(function(err){
				if(err) return console.log(err)
				console.log('Post deleted')
			})
			closePanel()
			location.reload()
		})
	}

	addTapEvent(_('.overlay'), function(e){
		if(e.target != _('.overlay')) return
		closePanel()
	})

	lightbox.appendChild(cardCopy)
}

Post.list(function(err, posts) {
	if (err) return alert('Kunde inte ladda posterna')
		var first = true
	posts.forEach(function (post, i) {
		addPostCard(post, i)
		if (post.isSlide){addSlide(post, first);first = false}
	})
})

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
	_(inactive).style.backgroundColor = ""
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
}

// _('.main-content').style.background = 'none'
// _('.main-content').style.boxShadow = 'none'

// var box = document.createElement('div')
// box.className ="utskottruta card menu addbox"
// addTapEvent(box,showadd)
// _(".card-container").appendChild(box)

// var add = document.createElement('div')
// add.className ="addplusdiv"
// box.appendChild(add)

// function showadd(){
// 	document.getElementsByTagName("body")[0].className += ' dark-body'
// 	_('.addplane').className += ' show-plane'
// }