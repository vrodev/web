Vue.component('utskott-card', {
	template: componentTemplates['item-card'],
	props: {
		data: { type: Object, required: true },
	},
	data: function () {
		return {
			message: 'Hello Vue!',
		}
	},
	computed: {
		editable: function () {
			return editAccess
		}
	},
	methods: {
		change: function () {
			this.message = 'hej'
		},
		deletedata: function () {
			var self = this
			this.data.delete(function(err){
				if(err) return console.log(err)
				self.$emit('deleted', self)
			})
		},
		expand: function () {
			if (this.expanded) return false
			// var data = this.$el
			// var className = 'card'

			// var cardCopy = data.cloneNode(true)
			// cardCopy.classList.add('data')
			// cardCopy.classList.remove(className)
			// cardCopy.removeAttribute("style")
			overlayApp.data = this.data
			this.$refs.prioritized.checked = this.data.prioritized
		},
		displayChange: function () {
			this.$refs.changeButton.style.display = 'inline-block'
		},
		save: function () {
			this.data.title = this.$refs.title.innerText
			this.data.subtitle = this.$refs.subtitle.innerText
			this.data.text = this.$refs.text.innerHTML
			this.data.prioritized = this.$refs.prioritized.checked
			this.data.save(function(err){
				if(err) {
					console.error(err)
					alert('Could not save')
					return
				}
			})
			this.$refs.changeButton.style.display = 'none'
		},
		closePanel: function () {
			overlayApp.closePanel()
		},
	},
})

//	card.dataset.id = data._id
// if(data.title.length == 0){
// 		card.querySelector('.info').style.margin = 0
