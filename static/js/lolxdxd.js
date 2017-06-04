/*var url = "/api/user/:id/";
var params = "id=" + api.currentUser._id
var http = new XMLHttpRequest();

http.open("GET", url+"?"+params, true);
http.send(console.log);*/

/*document.body.style.backgroundColor = '#e6e6e6'
*/

if(/Android/i.test(navigator.userAgent) && !window.matchMedia('(display-mode: standalone)').matches){
	notis = document.createElement('div')
	notis.classList.add("app-reminder")
	notis.innerHTML = '<b>Installera appen</b>, i Chrome, klicka på <b style="font-size:110%">⁝</b> och alternativet <b>Add to homescreen</b>'
	document.body.appendChild(notis)

	function closeBanner(){
		_('.app-reminder').parentNode.removeChild(_('.app-reminder'))
	}

	close = document.createElement('div')
	close.classList.add("close")
	close.innerText = '+'
	notis.appendChild(close)

	document.body.setAttribute("onclick", "closeBanner()")

	setTimeout(function () {notis.style.opacity = '1'}, 1500)
}

_('.main-content').classList.add('home-content')

var editAccess = false
if (api.currentUser && api.currentUser.memberships)
	editAccess = api.currentUser.memberships.some(function(membership) {
		return membership.group.name == "redigera" && membership.permissions.indexOf("POST")>=0
})

if(editAccess) _('.add-card-hidden').style.display = 'block'

document.body.classList.add('mainPage')
var links = document.querySelectorAll('.link')

for (var i = 0, len = links.length; i < len; i++) {
	links[i].classList.add('subtle-link')
}

var app;
var overlayApp = new Vue({
	el: '#overlay-app',
	data: {
		post: null,
	},
	watch: {
		post: function (newVal) {
			document.body.classList.toggle('lightbox-visible', !!newVal)
			if(newVal){
				var headerShadow = document.createElement('div') 
				headerShadow.classList.add('headershadow')
				_('.topheader').appendChild(headerShadow)
			}			
		},
	},
	methods: {
		closePanel: function () {
			this.post = null
			_('.topheader').removeChild(_('.topheader').querySelector('.headershadow')
		},
		postWasDeleted: function (item) {
			app.posts.splice(app.posts.indexOf(item.post),1)
			this.closePanel()
		},
	},
})




app = new Vue({
	el: '.main-content',
	data: {
		message: 'Hello Vue!',
		posts: [],
		tabs: ['Prioriterade poster', 'Alla poster'],
		selectedTab: 'Prioriterade poster',
	},
	computed: {
		filteredPosts: function () {
			var self = this
			return this.posts.filter(function(item){
				return self.selectedTab == 'Alla poster' || item.prioritized
			})
		},
	},
	methods: {
		change: function () {
			this.message = 'hej'
		},
	},
	mounted: function () {
		var self = this
		Post.list(function(err, posts) {
			if (err) return alert('Kunde inte ladda posterna')
			self.posts = posts
		})
	},
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

var foodColor = '#e0912e' //pageinfos.mat.color

_('.card.menu').style.backgroundColor = blendColors(foodColor, '#ffffff', 0.1)
_('.vegstamp>.text').style.color = foodColor
api.food(function(err, weeks) {
	if (err) return foodLoadingError(err)

	var currentWeekNr = (new Date()).getWeek()
	var weekIndex = weeks.findIndex(function(week) {return week.nr==currentWeekNr})
	if (weekIndex<0) return foodLoadingError('Current week wasn\'t found')

	// Select day, monday next week if weekend
	var currentDayOfWeek = (new Date()).getDay()

	var week = weeks[weekIndex]

	var day = week.days.find(function(day) {return day.nr==currentDayOfWeek})
	if (!day){
		_('.menu').classList.add('display-none')
		return foodLoadingError('Current day wasn\'t found')
	}

	var date = new Date(day.date)
	if(day.courses.main == day.courses.veg){
		_('.reg').style.padding = '2%'
	}else{
		_('.reg').innerText = day.courses.main
	}
	_('.veg').innerText = day.courses.veg
})



function closeAddCard() {
	document.body.classList.remove('lightbox-visible')
	var lightbox = _('body > .overlay .lightbox')

	lightbox.querySelector('.add-card').remove()
}

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
