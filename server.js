// server.js
// VRO Web
// 
// Initially created by Leonard Pauli, sep 2016

const express = require('express')
var logger = require('morgan')
var app = express()
var cookieParser = require('cookie-parser')
var models = require('./helpers/db-connect').models
var jwt = require('jwt-simple');

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.set('views', __dirname + '/source/templates')
app.locals.pretty = true;
app.set('view engine', 'jade')

app.use(cookieParser())

// Models
app.use(function(req, res, next) {
  req.models = models
  next()
})

// JWT - Authenticate
app.set('jwtTokenSecret', 'tHis7777SooasfdasdjSEEEEEcret');
app.use(require('./middlewares/authenticate'))

// Router
var router = require('./routers/router.js')
app.use(router)

// Temporary api router
var tmpAPI = require('./routers/tmp-api.js')
app.use('/api', tmpAPI)

// 404 page
app.use(require('./middlewares/errorPageHandler'));

// Start server
app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + (process.env.PORT || 3000))
})