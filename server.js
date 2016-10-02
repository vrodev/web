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

// Router
var router = require('./routers/router.js')
app.use(router)

// Temporary api router
var tmpAPI = require('./routers/tmp-api.js')
app.use('/api', tmpAPI)

// 404 Not found handling
// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(function(req, res, next){
  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('error404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// Start server
app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + (process.env.PORT || 3000))
})