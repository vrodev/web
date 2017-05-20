_('.main-content').style.maxWidth = 'none'

if (api.currentUser && window.matchMedia("(max-width: 500px)").matches){
	_('.logged-in').style.backgroundColor = blendColors(pageinfos.mat.color, "#ffffff", 0.2)
}

api.food(function(err, weeks) {
	if (err) return (function foodLoadingError(err) {
		// TODO: Show in UI
		console.error({api:'food', err:err})})()
	
	var currentWeekNr = (new Date()).getWeek()
	var currentDayOfWeek = (new Date()).getDay()
	var isWeekend = currentDayOfWeek==0 || currentDayOfWeek==6

	weeks.forEach(function(week) {
		if (week.nr<currentWeekNr) return
		if (week.nr>currentWeekNr+1 && !isWeekend) return
		if (week.nr>currentWeekNr+2 && isWeekend) return
		if (week.nr == currentWeekNr && isWeekend) return

		if(isWeekend) {
			var isCurrentWeek = currentWeekNr+1 == week.nr
		}else{
			var isCurrentWeek = currentWeekNr == week.nr
		}

		if (!isCurrentWeek || (isCurrentWeek && isWeekend) ) {
			temp = document.createElement('div')
			temp.className ="day nextWeek"
			_(".matdagar").appendChild(temp)

			text = document.createElement('p')
			text.className = "veckodag nextWeek"
			temp.appendChild(text)
			text.innerHTML = week.nr==currentWeekNr+1? "Nästa vecka": "Vecka "+week.nr			
		}

		week.days.forEach(function(day) {
			day.date = new Date(day.date)
			var isCurrentDay = currentDayOfWeek==day.nr

			temp = document.createElement('div')
			temp.className ="day"
			_(".matdagar").appendChild(temp)

			text = document.createElement('p')
			text.className = "veckodag"
			temp.appendChild(text)
			text.innerHTML = day.name

			textDate = document.createElement('p')
			textDate.className = "veckodag dateMonth"
			temp.appendChild(textDate)
			textDate.innerHTML = day.date.getDate()

			if(day.courses.main !== day.courses.veg){
				textreg = document.createElement('p')
				textreg.className = "meny huvudratt"
				textreg.innerText = day.courses.main
				temp.appendChild(textreg)
			}
			
			/*symbVeg = document.createElement('div')
			symbVeg.className = "veg-symbol"
			temp.appendChild(symbVeg)		*/			

			textveg = document.createElement('p')
			textveg.className = "meny vegratt"
			textveg.innerText = '✿ ' + day.courses.veg
			temp.appendChild(textveg)

			if(day.courses.main !== day.courses.veg){
				var todayTargets = [temp,text,textreg,textveg,textDate]
			}else{
				var todayTargets = [temp,text,textveg,textDate]
			}

			if (isCurrentDay && isCurrentWeek) {
				todayTargets.forEach(function(el) {
					el.className += " today" })
				_('.day.today').style.backgroundColor = blendColors(pageinfos.mat.color, '#ffffff', .75)
			}

			//- if (i == arr.length -1 && !any){
			//- 	var divs = document.querySelectorAll('.veckodag'), e;
			//- 	for (e = 0; e < divs.length; ++e) {
			//- 		divs[e].style.color = "black";
			//- 	}
			//- 	var divs2 = document.querySelectorAll('.meny'), f;
			//- 	for (f = 0; f < divs.length; ++f) {
			//- 		divs2[f].style.color = "black";
			//- 	}
			//- }

		})
	})
})
