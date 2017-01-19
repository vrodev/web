// http://mpi.mashie.se/public/icalendar/KK%20VRVasastan/4465fa56.ics?language=sv-SE
var http = require('http')
var options = {
  host: 'mpi.mashie.se',
  port: 80,
  path: '/public/icalendar/KK%20VRVasastan/4465fa56.ics?language=sv-SE'
};

// http.get(options, function(res) {
//   console.log("Got response: " + res.statusCode);
// }).on('error', function(e) {
//   console.log("Got error: " + e.message);
// });

function fetchRawFoodData(callback){
	var content = ""

	var req = http.request(options, function(res) {
		res.setEncoding("utf8")
		res.on("data", function (chunk) {
			content += chunk
		});

		res.on("end", function () {
			callback(content)
		});
	});

	req.end()
}

function parseFoodData(rawFoodData){
	var arr = []
	var x = rawFoodData
	x.replace(/DATE:(\d{4})(\d{2})(\d{2})/g, function(wholeMatch, year, month, day, index, wholeString) {

		var date = new Date(year, month, day)
		var weekdaysNames = "Torsdag,Fredag,Lördag,Söndag,Måndag,Tisdag,Onsdag".split(",")
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


		var vegName = "\\nVegetarisk: "
		var vegStart = foodString.indexOf(vegName)
		var vegEnd = vegStart + vegName.length


		var mainFood = foodString.substr(0, vegStart)
		var vegFood = foodString.substr(vegEnd)
		vegFood = vegFood.replace(/\\n ?/g, "")

		if(mainFood == vegFood){
			mainFood = 'Vegitarisk dag'
		}

		arr[arr.length] = {
			"mainFood":mainFood,
			"vegFood":vegFood,
			"date":dayName,
			"dateNumber": dayOfWeek,
			"dateMS": day/*Math.abs(date),*/
		}
	})
	console.log(arr)
	return arr
}

module.exports = {'parseFoodData':parseFoodData,'fetchRawFoodData':fetchRawFoodData}