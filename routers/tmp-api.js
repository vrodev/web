// tmp-api.js
// VRO Web

var express = require('express')

module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // /api/lol?name=Erik
  router.get('/clickedKilled', function(req, res) {
    var name = req.query.name // Erik

    res.json({
      error: false,
      message: "Loggade knapptryckning på knappen KILLED och skickade svar!",
    })
  })

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

  router.get('/resetCircle', function(req, res) {
    var name = req.query.name
    res.json({
      error: false,
      message: "Körde återskapa cirkel-funktionen med parametern "+name+"",
    })
  })

  // -----------
  return router;    
})();