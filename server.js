// server.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var express = require('express')
var logger = require('morgan')
var app = express()

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.set('views', __dirname + '/source/templates')
app.locals.pretty = true;
app.set('view engine', 'jade')

var router = require('./routers/router.js')
app.use(router)

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port' + (process.env.PORT || 3000))
})