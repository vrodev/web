/*var url = "/api/user/:id/";
var params = "id=" + api.currentUser._id
var http = new XMLHttpRequest();

http.open("GET", url+"?"+params, true);
http.send(console.log);*/

/*document.body.style.backgroundColor = '#e6e6e6'
*/

if(window.matchMedia("(max-width: 500px)").matches) _('.showoff').querySelector('.name').innerHTML = 'Vro Elevkår'

var editAccess = false
if (api.currentUser.memberships)
	editAccess = api.currentUser.memberships.some(function(membership) {
		return membership.group.name == "redigera" && membership.permissions.indexOf("POST")>=0
	})


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

var app;
var overlayApp = new Vue({
	el: '#overlay-app',
	data: {
		post: null,
	},
	watch: {
		post (newVal) {
			document.body.classList.toggle('lightbox-visible', !!newVal)
		},
	},
	methods: {
		closePanel() {
			this.post = null
		},
		postWasDeleted (item) {
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
		filteredPosts(){
			var self = this
			return this.posts.filter(function(item){
				return self.selectedTab == 'Alla poster' || item.prioritized
			})
		},
	},
	methods: {
		change(){
			this.message = 'hej'
		},
	},
	mounted(){
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
	if (!day){
		_('.menu').classList.add('display-none')
		return foodLoadingError('Current day wasn\'t found')
	}

	_('.weekday').innerText = day.name
	var date = new Date(day.date)
	_('.monthday').innerText = date.getDate()
	_('.reg').innerText = day.courses.main
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
