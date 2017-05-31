"use strict";
// router.js
// VRO Web

const express = require('express')
const config = require('../config')

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var fs = require('fs')
var path = require('path')

const pug = require('jade')
const compDir = path.join(__dirname, '../source/templates/components')
const componentTemplates = fs.readdirSync(compDir)
  .filter(c=> c.substr(-5)=='.jade')
  .map(c=> c.substr(0,c.length-5))
  .map(name=> ({ name, html: pug.compileFile(path.join(compDir, name+'.jade'))({}) }))

const componentTemplatesDict = {}
componentTemplates.forEach(item=> componentTemplatesDict[item.name] = item.html)
const componentTemplatesString = JSON.stringify(componentTemplatesDict)

function randomWrongCodeMessage() {
  const messages =
        ["Verkar som att koden inte riktigt stämde... Testa igen?",
        "The code you've entered seems to be invalid. Please try again.",
        "Koden du har angivit är felaktig. Försök igen.",
        "Din kod är ogiltig. Testa en gång till.",
        "Hmm, våra system hittar inte den koden! Skrev du fel?",
        "Fel kod, testa igen!"]
  return messages[Math.floor(Math.random()*messages.length)]
}

const jsFilesToLoad = (()=>{
  const txt = fs.readFileSync(path.resolve(__dirname + '/../source/jsFilesToLoad.txt'),'utf8')
  const lines = txt.split(config.usingCRLF? '\r\n': '\n')
  return lines.filter(line=>line.length&&line.substr(0,1)!="#").map(line=>{
    const components = line.split(': ')
    const prefix = (path=>path.length?path+'/':'')(components[0])
    return components[1].split(', ').map(path=>prefix+path)
  }).reduce((all,paths)=>all.concat(paths))
})();


module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // Array of the routes
  // {page:'name', path:'url-after-/',
  // data:{title:'...'}, fn:function(req,res){}}
  // fn: return false to prevent auto res.render()
  var routes = [
    {page:'lolxdxd', path:'', },
    {page:'login', fn:async (function(req, res, data) {
      if (req.query.error=="incorrect") {
        data.errorMessage = randomWrongCodeMessage()
      } else if (req.query.error)
        data.errorMessage = "Något gick snett: "+req.query.error
    })},
    {page:'login', path:'logout', fn:async (function(req, res, data) {
      req.setLogout();data.errorMessage="Du är nu utloggad";})},
    {page:'main', fn:async (function(req, res, data) {
      if (req.user && req.user.catcher) data.target = req.user.catcher.target
      if (req.user) {
        data.availableBonuses = []
        let catches = await (req.models.Catch.find({user:req.user._id}).sort({'createdAt': 1}).select('createdAt points').exec())
        data.catchCount = 0
        if (catches && catches.length) {
          data.catchCount = catches.length
          data.catches = catches
          let points = catches.reduce((prev,val)=>prev+val.points, 0)
          data.points = Math.round(points*config.catcher.pointsDisplayMultiplier*10)/10
        }
        data.availableBonuses = config.catcher.bonuses
          .filter(o=>o.enabled(catches))
          .map(o=>o.startDate=o.startDateFn(catches))

        data.isNoobed = req.user.catcher.isNoobed
      }
    })},
    {page:'catch', fn:async (function(req, res, data) {
      if (req.query.error=="incorrect") {
        data.errorMessage = randomWrongCodeMessage()
      } else if (req.query.error)
        data.errorMessage = "Något gick snett: "+req.query.error
      if (req.user && req.user.catcher) data.target = req.user.catcher.target
    })},
    {page:'catch-success', fn:async (function(req, res, data) {
      let catchCode = req.query.catchCode
      let targetCatchCode = req.user.catcher.target.catcher.catchCode

      if (!catchCode) {
        res.redirect('/catch');
        return false;
      } else if (!targetCatchCode || catchCode.toUpperCase()!==targetCatchCode.toUpperCase()) {
        res.redirect('/catch?error=incorrect')
        return false;
      }

      // Success
      require('../helpers/catchLogic').performCatch(req.user, function(nextTarget) {

        let route = {page:'catch-success', data:data}
        if (!route.data.title) route.data.title = 'Catcher'
        if (!route.data.user) route.data.user = req.user
        route.data.dataPage = route.page
        res.render('catcher/'+route.page, route.data)

      })
      
      return false;
    })},
    {page:'die', fn:async (function(req, res, data) {
      data.catchCode = await (require('../helpers/catchLogic').initializeCatchCode(req.user))
    })},
    {page:'faq'},
    {page:'loginvro'},
    {page:'mat'},
    {page:'karkort'},
    {page:'am'},
    {page:'om'},
    {page:'karen'},
    {page:'styrelsen'},
    {path:'styrelsen/:info',page:'styrelsenpers', dataGen: req=>{
      return {styrelsen:req.params.info}
    }},
    {page:'kommitte'},
    {page:'admin'},
    {page:'added'},
    {path:'kommitte/:info',page:'enkommitte', dataGen: req=>{
      return {kommitte:req.params.info}
    }},
    {page:'utskott'},
    {path:'utskott/:utskottnamn',page:'ettutskott', dataGen: req=>{
      return {utskott:req.params.utskottnamn}
    }},
    {path:'emails/catcher-welcome', page:'../emails/catcher-welcome',dataGen: req=>({
      loginCode:'LOGINCODE',name:'NAME',url:config.webURL})},
    {page:'admin'},
  ]
  
  // Loop through the routes array and
  // register them with the express router
  for (var i = 0; i<routes.length; i++) {
    var route = routes[i]
    if (!route.path && route.path != '') route.path = route.page

    router.get('/'+route.path, (function(route) {return function(req, res) {async (function(){
      route.data = route.dataGen ? route.dataGen(req) : {}
      if (route.fn && await (route.fn(req, res, route.data)) === false) return;
      if (!route.data.title) route.data.title = 'VRO Elevkår'
      if (!route.data.user) route.data.user = req.user
      if (!route.data.jsFilesToLoad) route.data.jsFilesToLoad = jsFilesToLoad
      if (!route.data.config) route.data.config = config
      route.data.dataPage = route.page

      route.data.componentTemplatesString = componentTemplatesString

      res.render('catcher/'+route.page, route.data)
    })()}})(route) )
  }

  // -----------
  return router;    
})();