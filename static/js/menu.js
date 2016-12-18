
function hej(){
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


var vegName = "\\nVegetarisk: "
var vegStart = foodString.indexOf(vegName)
var vegEnd = vegStart + vegName.length


var mainFood = foodString.substr(0, vegStart)
var vegFood = foodString.substr(vegEnd)
vegFood = vegFood.replace(/\\n /, "")

arr[arr.length] = {
"mainFood":mainFood,
"vegFood":vegFood,
"date":dayName,
"dateMS": Math.abs(date)
}
});

return arr;
}


var t = hej()
t[0]