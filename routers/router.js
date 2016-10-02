// router.js
// VRO Web

var express = require('express')

module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // Array of the routes
  // {page:'name', path:'url-after-/',
  // data:{title:'...'}, fn:function(req,res){}}
  // fn: return false to prevent auto res.render()
  var routes = [
    {page:'', path:'', fn:function(req, res) {res.redirect('/main')}},
    {page:'login'},
    {page:'main', data:{target: 'Erik'}},
    {page:'catch'},
    {page:'catch-success'},
    {page:'die'},
    {page:'faq'}
  ]
  
  // Loop through the routes array and
  // register them with the express router
  for (var i = 0; i<routes.length; i++) {
    var route = routes[i]
    if (!route.path) route.path = route.page

    router.get('/'+route.path, (function(route) {return function(req, res) {
      if (route.fn && route.fn(req, res) === false) return;
      if (!route.data) route.data = {}
      if (!route.data.title) route.data.title = 'Catcher'
      route.data.dataPage = route.page
      res.render('catcher/'+route.page, route.data)
    }})(route) )
  }

  // -----------
  return router;    
})();