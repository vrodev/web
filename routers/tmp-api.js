// tmp-api.js
// VRO Web

var express = require('express')

module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // /api/lol?name=Erik
  router.get('/lol', function(req, res) {
    var name = req.query.name // Erik

    res.json({
      error: false,
      message: "Hello there, "+name+"!"
    })
  })

  router.get('/sayDie', function(req, res) {
    var name = req.query.name // Erik

    res.json({
      error: false,
      message: "You're going down, "+name+"!",
      randomVariable: "Tjenare!"
    })
  })

  // -----------
  return router;    
})();