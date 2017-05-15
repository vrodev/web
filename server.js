"use strict"
// server.js
// VRO Web
// 
// Initially created by Leonard Pauli, sep 2016

const express = require('express')
const logger = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const models = require('./helpers/db-connect').models
const config = require('./config')

app.use(logger('dev'))
app.use(express.static(config.staticDir))
app.set('views', config.viewTemplates)
app.locals.pretty = false//config.isDev;
app.set('view engine', 'jade')
app.set('x-powered-by', false)

app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
//app.use(bodyParser.text({type: '*/*'}));


// Models
app.use(function(req, res, next) {
  req.models = models

  res.abortIf = (err, msg, data)=> {
  	if (!err) return false
  	console.dir({msg,err})
    const obj = {error:msg}
    if (data) Object.assign(obj, data)
		res.status(500).send(obj)
		return true}

	res.apiOK = (data)=> {
		res.json({data:data})
	}

  // if (res.requiredPermissions("EDIT")) return;
  res.requiredPermissions = (permissions, group)=> {
    return false

    const perms = (typeof permissions == 'string'?[permissions]:permissions)
    const gname = group || "redigera"
    let ok = true
    ok = ok && req.user
    ok = ok && ok.memberships.find(m=> m.group.name == gname)
    console.log(Array(100).fill('-').join(''))
    console.dir(ok)
    ok = ok && !perms.map(p=> ok.permissions.indexOf(p)>-1).some(v=> !v)
    console.dir(ok)
    
    if (!ok) res.status(401).json({error: 'Unsufficient permissions', permissionsRequired: perms})
    return !ok
  }

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