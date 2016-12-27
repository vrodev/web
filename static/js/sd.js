function heej(){
			x = "BEGIN:VCALENDAR PRODID:-//Mashie AB//Mashie iCalendar//SE VERSION:2.0 CALSCALE:GREGORIAN METHOD:PUBLISH X-WR-CALNAME:Ny Matsedel X-WR-TIMEZONE:Europe/Stockholm X-WR-CALDESC:Ny Matsedel BEGIN:VEVENT DTSTART;VALUE=DATE:20161219 DTSTAMP:20161222T161034 UID:20161222T161034@6da0b8ea-1509-453f-881f-7e079e969e3d CREATED:20161222T161034 SUMMARY:Ekologisk pasta med strimlat nötkött\, champinjoner och grädde DESCRIPTION:Huvudrätt: Ekologisk pasta med strimlat nötkött\, champinjoner och grädde\nVegetarisk: Ekologisk pasta med soltorkade tomater\, smörbönor och grädde\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161220 DTSTAMP:20161222T161034 UID:20161222T161034@2bb1897b-b444-42b8-8226-c0bd0bba5c22 CREATED:20161222T161034 SUMMARY:Kycklinglårfilé med creme fraiche\, paprika och dragon serveras med ekologiskt ris DESCRIPTION:Huvudrätt: Kycklinglårfilé med creme fraiche\, paprika och dragon serveras med ekologiskt ris\nVegetarisk: Tofu- och grönsaker tikka masala serveras med ekologiskt ris\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161221 DTSTAMP:20161222T161034 UID:20161222T161034@963dc935-d0a9-4d6e-8ff9-1f0199a0928b CREATED:20161222T161034 SUMMARY:Vegetariska Dagen DESCRIPTION:Huvudrätt: Vegetariska Dagen\nVegetarisk: Vegetariska Dagen\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161222 DTSTAMP:20161222T161034 UID:20161222T161034@fb7acf91-f65d-47a8-a8c2-19ac7d7c9ccf CREATED:20161222T161034 SUMMARY:Panerad MSC-fisk med remouladsås serveras med KRAV-potatis DESCRIPTION:Huvudrätt: Panerad MSC-fisk med remouladsås serveras med KRAV-potatis\nVegetarisk: Broccoligratäng gratinerad med mozzarella serveras med KRAV-potatis\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161223 DTSTAMP:20161222T161034 UID:20161222T161034@c50b4c56-b764-49cf-a66f-0a6aa8e9c2a9 CREATED:20161222T161034 SUMMARY:Potatisbullar med stekt fläsk och lingonsylt DESCRIPTION:Huvudrätt: Potatisbullar med stekt fläsk och lingonsylt\nVegetarisk: Potatisbullar med bönröra och keso\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161227 DTSTAMP:20161222T161034 UID:20161222T161034@e58ae589-d8f8-4dc8-aab9-9cea1a9c4f34 CREATED:20161222T161034 SUMMARY:Oxjärpar med skysås och kokt KRAV-potatis DESCRIPTION:Huvudrätt: Oxjärpar med skysås och kokt KRAV-potatis\nVegetarisk: Vegetariska biffar med skysås och kokt KRAV-potatis\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161228 DTSTAMP:20161222T161034 UID:20161222T161034@c43015e0-386f-45e0-8e35-ba8f9d9cc8db CREATED:20161222T161034 SUMMARY:Ekologisk pasta med kalkon i tomatsås DESCRIPTION:Huvudrätt: Ekologisk pasta med kalkon i tomatsås \nVegetarisk: Ekologisk pasta med sås på belugalinser\, tomat och paprika\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161229 DTSTAMP:20161222T161034 UID:20161222T161034@c5964c41-2141-48c0-a747-de1fe1039410 CREATED:20161222T161034 SUMMARY:MSC fiskpanetter serveras med aioli och ekologiskt ris DESCRIPTION:Huvudrätt: MSC fiskpanetter serveras med aioli och ekologiskt ris\nVegetarisk: Ekologisk falafel med aioli serveras med ekologiskt ris\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT BEGIN:VEVENT DTSTART;VALUE=DATE:20161230 DTSTAMP:20161222T161034 UID:20161222T161034@9ebdffe4-f04a-4274-981c-c21998ace9c4 CREATED:20161222T161034 SUMMARY:Kycklinglårfilé i örtsås serveras med kokt KRAV-potatis DESCRIPTION:Huvudrätt: Kycklinglårfilé i örtsås serveras med kokt KRAV-potatis \nVegetarisk: Gryta på sojabitar\, rostade grönsaker serveras med kokt KRAV-potatis\n LOCATION: LAST-MODIFIED:20161222T161034 SEQUENCE:0 TRANSP:TRANSPARENT END:VEVENT END:VCALENDAR"
			var arr = []
			x.replace(/DATE:(\d{4})(\d{2})(\d{2})/g, function(wholeMatch, year, month, day, index, wholeString) {
				var myDate = day+"/"+month+" - "+year

				var date = new Date(year, month, day)
				var weekdaysNames = "Sön,Må,Ti,Ons,Tor,Fre,Lör".split(",")
				var dayOfWeek = date.getDay()
				var dayName = weekdaysNames[dayOfWeek]


				//var dateMatchLength = "DATE:YYYYMMDD".length

				wholeString = wholeString.replace(/\\,/g, ",")

				var afterDateString = wholeString.substr(index)
				var descName = "DESCRIPTION:"
				var descStart = afterDateString.indexOf(descName) + descName.length

				var locName = "LOCATION:"
				var descEnd = afterDateString.indexOf(locName)

				var mainName = "Huvudrätt: "
				var mainEnd = afterDateString.indexOf(mainName) + mainName.length

				var foodString = afterDateString.substr(mainEnd, descEnd - mainEnd)


				var vegName = "\nVegetarisk: "
				var vegStart = foodString.indexOf(vegName)
				var vegEnd = vegStart + vegName.length


				var mainFood = foodString.substr(0, vegStart)
				var vegFood = foodString.substr(vegEnd)
				vegFood = vegFood.replace(/\n /, "")

				arr[arr.length] = {
				"mainFood":mainFood,
				"vegFood":vegFood,
				"date":dayName,
				"dateMS": Math.abs(date)
				}
			})
				console.log(arr)
				return arr;
		}

		var arr = heej()