// helpers.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

var generateSimpleCode = function(count) {
	var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	var text = ""
	for (var i = 0; i<count; i++)
		text += possible[Math.floor(Math.random()*possible.length)]
	return text;
}