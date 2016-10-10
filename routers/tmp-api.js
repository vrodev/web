"use strict";
// tmp-api.js
// VRO Web

var express = require('express')

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const awaitres = require('../helpers/helpers').awaitres;
const sendEmail = require('../helpers/helpers').sendEmail;


// ------------------------------------------------------------------------
module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  router.get('/users', (req, res) => {
    if (req.query.secret!='kanelbulle') return res.send('wuut');
    async (() => {
      let users = await (req.models.User.find({}).exec())
      // if (req.query.html) {
      //   return res.send(user.name+'\'s target is <a href="'+user.catcher.target._id+'?html=true">'+user.catcher.target.name+'</a>')
      // }
      res.json(users)
    })()
  })

  router.get('/catches', (req, res) => {
    if (req.query.secret!='kanelbulle') return res.send('wuut');
    async (() => {
      let catches = await (req.models.Catch.find({}).exec())
      // if (req.query.html) {
      //   return res.send(user.name+'\'s target is <a href="'+user.catcher.target._id+'?html=true">'+user.catcher.target.name+'</a>')
      // }
      res.json(catches)
    })()
  })


  router.get('/user/:id', (req, res) => {
    if (req.query.secret!='kanelbulle') return res.send('wuut');
    async (() => {
      let user = await (req.models.User.load(req.params.id, 'catcher.target'))
      if (req.query.html) {
        return res.send(user.name+'\'s target is <a href="'+user.catcher.target._id+'?html=true">'+user.catcher.target.name+'</a>')
      }
      res.json(user)
    })()
  })


  // ---------------------------
  // /api/lol?name=Erik
  router.get('/clickedKilled', function(req, res) {
    var name = req.query.name // Erik
    
    res.json({
      error: false,
      message: "Loggade knapptryckning på knappen KILLED och skickade svar!",
    })
  })


  // ---------------------------
  router.get('/clickedDied', function(req, res) {
    var name = req.query.name // Erik

    req.models.User.find(function(error, users) {
      var messageString = users.map(user=>user.name).join(', ')
      console.log('found', arguments)
      res.json({
        error: false,
        message: "Loggade knapptryckning på knappen DIED och skickade svar!" +messageString,
        messageString: messageString
      })
    });
    
  })


  // ---------------------------
  router.get('/resetCircle', function(req, res) {
    var name = req.query.name
    res.json({
      error: false,
      message: "Körde återskapa cirkel-funktionen med parametern "+name+"",
    })
  })


  // ---------------------------
  router.get('/getEmail', function(req, res) {
    req.models.User.find(function(error, users) {
      var emailString = "";
      for(var i = 0; i < users.length; i++) {
        emailString += users[i].email + ";";
      }
      console.log('found', arguments)
      res.json({
        error: false,
        messageString: emailString
      })
    });
  })


  // ---------------------------
  router.get('/sendEmail', function(req, res) {
    "use strict";
    if (req.query.secret!='kanelbulle') return res.send('wuut');
    let filter = {}
    if (req.query.email) filter = {email:req.query.email}
    ;(async (function (){
    let sendError = (err, message) => {console.log(err);res.json({
      error: true, message: message}) }

    let users = awaitres (req.models.User.find(filter),sendError)
    if (!users) return;
    
    let count = users.length, i=0
    try {
      users.map(user => {
        var emailRes = await (sendEmail(user.email, 'Catcher 2016', 'catcher-welcome', {
          loginCode: user.loginCode, name:user.firstName }))
        i++;
        console.log('Email response ('+i+'/'+count+'): ',
          emailRes.statusCode, emailRes.body, emailRes.headers)
      })

      res.json({
        error: false,
        message: "Bör nu ha skickat e-postmeddelanden till e-postadresser i databasen ("+count+")"
      })
    } catch(err) {
      return sendError(err, "Reached "+i+" of "+count)
    }
  }))()})


  // -----------
  return router;    
})();