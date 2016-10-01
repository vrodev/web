// router.js
// VRO Web

var express = require('express')

module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  router.get('/', function(req, res) {
    res.redirect('/main')
  });

  router.get('/login', function(req, res) {
    res.render("catcher/login", {
      title: 'Catcher',
      dataPage: 'login'
    })
  });

  router.get('/main', function(req, res) {
    res.render("catcher/main", {
      title: 'Catcher',
      dataPage: 'main',

      target: 'Emma'
    })
  });

  router.get('/catch', function(req, res) {
    res.render("catcher/catch", {
      title: 'Catcher',
      dataPage: 'catch'
    })
  });

  router.get('/catch-success', function(req, res) {
    res.render("catcher/catch-success", {
      title: 'Catcher',
      dataPage: 'catch-success'
    })
  });

  router.get('/die', function(req, res) {
    res.render("catcher/die", {
      title: 'Catcher',
      dataPage: 'die'
    })
  });

  router.get('/faq', function(req, res) {
    res.render("catcher/faq", {
      title: 'Catcher',
      dataPage: 'faq'
    })
  });

  // -----------
  return router;    
})();



 //http://localhost:300/?onlyMainContent=true
    //req.query.onlyMainContent

  // router.get('/', function(req, res) {
  //   //http://localhost:300/?onlyMainContent=true
  //   //req.query.onlyMainContent

  //   res.render("homepage", {
  //     title: 'Catcher'
  //   })
  // });

  // router.get('/login', function (req, res) {
  //   res.render('partials/' + name);
  // });