var express = require('express')
var logger = require('morgan')
var app = express()

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.set('views', __dirname + '/source/templates')
app.locals.pretty = false;
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render("homepage", {title:'home'})
})

app.get('/a', function (req, res) {
  res.render("divfishpage", {title:'home'})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port' + (process.env.PORT || 3000))
})