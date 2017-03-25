var isNotafication = false
//addTapEvent(_('.chooseNotify'),isNotafication)
/*function defineNotify(){
	isNotafication = !isNotafication
	if(isNotafication){
		_('.chooseSlide').innerText = 'Notis begärd'
	}else{
		_('.chooseSlide').innerText = 'Begärd notis'
	}
}*/

var savedFile = {}
function addObject(card) {
	var sendBtn = card.querySelector('.choice.publish')
	var input = card.querySelector('input.imageinput#bild')
	var file = input.files[0]
	if (!file) return alert('No file was added')

	var aborted = function(err) {
		alert(err)
		sendBtn.innerText = 'Publicera'
		console.error(err)
	}

	var uploadPost = function(imgUrl) {
		var post = new Post()
		post.title = card.querySelector('.title').innerHTML
		post.text = card.querySelector('.text').innerHTML
		post.prioritized = _('#prioritizedCheckbox').checked
		post.imgUrl = imgUrl
		post.save(function(err) {
			if (err) return aborted(err)
			//alert('Publicerad!')

			closePanel()
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

function closePanel(){
	var lightbox = _('body > .overlay .lightbox')
	document.body.classList.remove('lightbox-visible')

	var items = lightbox.querySelectorAll('.item')
	items.forEach(function(item) {
		//if (item.parentNode != lightbox) return
		item.remove()
	})
}