// Date helpers
Date.prototype.weekdayString = function() {
	return 'Söndag,Måndag,Tisdag,Onsdag,Torsdag,Fredag,Lördag'.split(',')[this.getDay()]}
Date.prototype.monthStringMMM = function() {
	return 'jan,feb,mar,apr,maj,jun,jul,aug,sep,oct,nov,dec'.split(',')[this.getMonth()]}
if (!Date.prototype.getWeek)
Date.prototype.getWeek = function() {
	// source: stackoverflow.com
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / (24*60*60*1000) - 3 + (week1.getDay() + 6) % 7) / 7); }



// addTapEvent
// callback(event)
function addTapEvent(element, callback) {
	element.addEventListener('click', callback, false)
	//element.addEventListener('touchend', callback, false)
}