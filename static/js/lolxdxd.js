/*var url = "/api/user/:id/";
var params = "id=" + api.currentUser._id
var http = new XMLHttpRequest();

http.open("GET", url+"?"+params, true);
http.send(console.log);*/

/*document.body.style.backgroundColor = '#e6e6e6'
*/

var editAccess = false
if(api.currentUser) editAccess = true
if(api.currentUser){
	var userProfile
	User.list(function(err, users, all){
		users.forEach(function(user){
			if(user._id == api.currentUser._id){
				if(user.memberships){
					editAccess = true
				}
			}
		})
	})
}


document.body.classList.add('noUser')
_('.topheader').classList.add('whiteheader')
_('.main-content').style.maxWidth = '100%'
_('.main-content').style.textAlign = 'center'


_('.extendHeader').classList.add('extendHeader-main')

if(editAccess) _('.add-card-hidden').style.display = 'block'

document.body.classList.add('mainPage')
var links = document.querySelectorAll('.link')
links.forEach(function(element){
	element.classList.add('subtle-link')
})

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

if(editAccess){
	addTapEvent(_('.add-card'), function() {
		document.body.classList.add('lightbox-visible')
		var lightbox = _('body > .overlay .lightbox')

		var cardCopy = _('.add-card').cloneNode(true)
		cardCopy.classList.toggle('add-card-hidden')
		cardCopy.classList.add('item')
		cardCopy.classList.remove('card')

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
	title.innerHTML = post.title

	var text = card.querySelector('.text')
	text.innerHTML = post.text

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

	if(editAccess){
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
function sortPosts(selected){
	_('.card-container').querySelectorAll('.card').forEach(function(el){
		if(!el.classList.contains('menu') && !el.classList.contains('template')){
			el.remove()
		}
	})
	Post.list(function(err, posts) {
		if (err) return alert('Kunde inte ladda posterna')
			var first = true
		posts.forEach(function (post, i) {
			if(selected == 'prioritized'){
				if (post.prioritized){addPostCard(post, i)}
			}else if(selected == 'all') addPostCard(post, i)
		})
	})

	if(selected == 'all'){
		_('.menu').style.display = 'none'
	}else if(selected == 'prioritized'){
		_('.menu').style.display = 'inline-block'
	}

	if(_('.sort-options').querySelector('.selected') !== null) _('.sort-options').querySelector('.selected').classList.remove('selected')
	_('#' + selected).classList.add('selected')
}

sortPosts('prioritized')

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