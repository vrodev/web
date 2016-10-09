// router.js
// VRO Web

const express = require('express')
const config = require('../config')


module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // Array of the routes
  // {page:'name', path:'url-after-/',
  // data:{title:'...'}, fn:function(req,res){}}
  // fn: return false to prevent auto res.render()
  var routes = [
    {page:'', path:'', fn:function(req, res) {
      res.redirect('/main');return false;}},
    {page:'login'},
    {page:'', path:'logout', fn:function(req, res) {
      req.setLogout();res.redirect('/login');return false;}},
    {page:'main', data:{target: 'Erik'}, fn:function(req, res, data) {
      data.name = !req.user ? 'not logged in' : req.user.name}},
    {page:'catch'},
    {page:'catch-success'},
    {page:'die'},
    {page:'faq'},
    {path:'emails/catcher-welcome', page:'../emails/catcher-welcome',data:{
      loginCode:'LOGINCODE',name:'NAME',url:config.webURL}},
    {page:'admin', data:{}, fn:function(req, res, data) {
      data.name = !req.user ? 'noemail' : req.user.email}},
  ]
  
  // Loop through the routes array and
  // register them with the express router
  for (var i = 0; i<routes.length; i++) {
    var route = routes[i]
    if (!route.path) route.path = route.page

    router.get('/'+route.path, (function(route) {return function(req, res) {
      if (!route.data) route.data = {}
      if (route.fn && route.fn(req, res, route.data) === false) return;
      if (!route.data.title) route.data.title = 'Catcher'
      route.data.dataPage = route.page
      res.render('catcher/'+route.page, route.data)
    }})(route) )
  }

  // -----------
  return router;    
})();