"use strict";
// config/catcher.js
// VRO Web
// 
// Initially created by Leonard Pauli, oct 2016


module.exports.pointsDisplayMultiplier = 10

module.exports.bonuses = [{
  title: "Speedy catcher combo",
  text: "Fånga ditt nästa offer inom 48h!",
  points: 0.5,
  startDateFn: catches=>Math.abs(catches[catches.length-1].createdAt),
  duration: 2*24*60*60*1000,
  enabled: catches=>catches.length
},{
  title: "Pumpakraften",
  text: "Bär en pumpa i famnen för tillfällig immunitet mot catchers!",
  startDateFn: _=>1478951032650,
  duration: 24*60*60*1000,
  enabled: _=>false
  //enabled: (catches,startDateFn)=>(startDateFn() - 7*24*60*60*1000)>new Date()
}]