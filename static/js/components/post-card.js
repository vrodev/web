Vue.component('post-card', {
	template: componentTemplates['post-card'],
	props: {
		post: { type: Object, required: true },
		expanded: { type: Boolean, default: false },
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
		deleteItem: function () {
			var self = this
			this.post.delete(function(err){
				if(err) return console.log(err)
				self.$emit('deleted', self)
			})
		},
		expand: function () {
			if (this.expanded) return false
			// var item = this.$el
			// var className = 'card'

			// var cardCopy = item.cloneNode(true)
			// cardCopy.classList.add('item')
			// cardCopy.classList.remove(className)
			// cardCopy.removeAttribute("style")
			overlayApp.post = this.post
		},
		displayChange: function () {
			this.$refs.changeButton.style.display = 'inline-block'
		},
		save: function () {
			this.post.title = this.$refs.title.innerText
			this.post.text = this.$refs.text.innerHTML
			this.post.save(function(err){
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

//	card.dataset.id = post._id
// if(post.title.length == 0){
// 		card.querySelector('.info').style.margin = 0
