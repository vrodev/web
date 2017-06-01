Vue.component('group-card', {
	template: componentTemplates['group-card'],
	props: {
		post: { type: Object, required: true },
	},
	data: function () {
		return {
		}
	},
	computed: {
		namespace: function () {
			return this.post.title.toLowerCase()
				.replace(/å|ä/g, 'a')
				.replace(/ö/g, 'o')
				.replace(/[^a-z1-9_-]/g, '-')
		}
	},
	methods: {
		expand: function () {
			window.location.href = '/'+this.post.type.toLowerCase()+'/' + this.namespace
		},
	},
})