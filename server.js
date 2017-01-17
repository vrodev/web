// server.js
// VRO Web
// 
// Initially created by Leonard Pauli, sep 2016

const express = require('express')
const logger = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')
const models = require('./helpers/db-connect').models
const config = require('./config')

app.use(logger('dev'))
app.use(express.static(config.staticDir))
app.set('views', config.viewTemplates)
app.locals.pretty = false//config.isDev;
app.set('view engine', 'jade')

app.use(cookieParser())

// Models
app.use(function(req, res, next) {
  req.models = models
  next()
})

// JWT - Authenticate
app.set('jwtTokenSecret', config.jwtTokenSecret);
app.use(require('./middlewares/authenticate'))

// Router
var router = require('./routers/router.js')
app.use(router)

// API router
var apiRouter = require('./api/routers/main.js')
app.use('/api', apiRouter)

// errorPageHandler
require('./middlewares/errorPageHandler')(app);

// Start server
const port = process.env.PORT || config.expressPort
app.listen(port, function () {
  console.log('Listening on port '+port)
})