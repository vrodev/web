// router.js
// VRO Web

var express = require('express')

module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  router.get('/', function(req, res) {
    res.render("homepage", {
      title:'VRO',
      text:"..."
    })
  });

  router.get('/login', function (req, res) {
    res.render('partials/' + name);
  });

  // -----------
  return router;    
})();