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
      var messageString = "";
        for(var i = 0; i < users.length; i++) {
           messageString += ", " + users[i].name;
        }
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
    "use strict"; (async (function (){
    let sendError = (err, message) => {console.log(err);res.json({
      error: true, message: message}) }

    let users = awaitres (req.models.User.find(),sendError)
    if (!users) return;
    
    let count = users.length, i=0
    try {
      users.map(user => {
        var emailRes = await (sendEmail(user.email, 'Catcher 2016', 'catcher-welcome', {
          loginCode: user.loginCode }))
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