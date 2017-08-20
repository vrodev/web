var savedFile = {}
function addGroup(group) {
	var sendBtn = card.querySelector('.choice.publish')
	var input = card.querySelector('input.imageinput#bild')
	var file = input.files[0] || undefined

	var aborted = function(err) {
		alert(err)
		sendBtn.innerText = 'Publicera'
		console.error(err)
	}

	var uploadPost = function(imgUrl) {
		var group = new Group()
		group.title = card.querySelector('.title').innerText
		group.about = card.querySelector('.text').innerHTML
		group.color = '#0f3446'
		group.imgUrl = imgUrl
		group.link = 'link'
		group.save(function(err) {
			if (err) return aborted(err)
			//alert('Publicerad!')

			overlayApp.closePanel()
			sendBtn.innerText = 'Publicera'
			window.location.reload()
		})
	}

	var callback = function(err, info, all) {
		if (err) return aborted(err)
		if (info.warnings) {
			info.warnings.forEach(console.warn)
			alert('Problem kan ha uppstått; observera:\n'+info.warnings.join('\n'))}
		if (!info.files.length) return aborted('No files uploaded')

		var upploadedFileURL = info.files[0]
		savedFile = info.files[0]

		uploadPost(savedFile.url)
	}
	var progress = function(procent) {
		//console.log('Upload is '+Math.round(procent*100)+' complete')
		sendBtn.innerText = 'Publicerar ('+Math.round(procent*97)+')'
	}

	if (file.name == savedFile.name) {
		uploadPost(savedFile.url)
	} else api.fileUpload(file, callback, {progress:progress})
}