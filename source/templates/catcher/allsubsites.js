script.
	var info = #{info}

	for (i=0; i<info.length; i++){

		if (info[i].name.toLowerCase() == val){

			link = document.createElement('div')
			link.className ="kommittelink"
			link.style.backgroundColor = info[i].color
			link.style.minHeight = "20px"
			document.querySelector('.center').appendChild(link)

			document.querySelector(".utskottheader").style.backgroundColor = info[i].color

			document.querySelector(".arbete").innerHTML = info[i].arbete
			document.querySelector(".hjalp").innerHTML = info[i].hjalp

			if (window.matchMedia("(max-width: 500px)").matches) {
				document.querySelector(".menubutton").style.filter = "invert(100%)"
				document.querySelector(".logga").style.filter = "invert(100%)"

				document.querySelector(".center-header").style.backgroundColor = info[i].color
				document.querySelector(".log").style.backgroundColor = blendColors(info[i].color, "#000000", 0.3)
			}
		}
	}