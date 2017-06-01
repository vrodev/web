Vue.component('base-card', {
	template: componentTemplates['base-card'],
	props: {
		post: { type: Object, required: true },
		expanded: { type: Boolean, default: false },
		editable: { type: Boolean, default: false },
	},
	data: function () {
		return {
		}
	},
	computed: {
		overlayGradient: function () {
			return this.post.color
				? headerLinearGradientFromHex(this.post.color,.9,.6)
				: 'linear-gradient(transparent, transparent)'
		},
	},
	methods: {
	},
})