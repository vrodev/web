"use strict";
// api/other.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express')
const food = require('../functions/food')

const savedData = {}

// /api
const routeMain = router=> {

	router.get('/food', (req, res) => {
    const callback = function(rawFoodData, shouldNotSave){
      const foodData = food.parseFoodData(rawFoodData)
      if (!shouldNotSave) {
      	// Cache data
        food.lastSaved = new Date()
        food.saved = rawFoodData
      }
      res.apiOK(foodData)
    }

    Use cached data if available
    const msInDay = 1000*60*60*24
    const today = new Date()
    if (food.lastSaved !== undefined
    	&& (today - food.lastSaved) < msInDay
      && (today.getDay() === 0 || food.lastSaved.getDay() !== 0)){
      callback(food.saved, true)
      return
    }

    // Fetch raw food data
    food.fetchRawFoodData((err, data)=> {
      if (res.abortIf(err, 'Couldn\'t load food data')) return;
      callback(data)
    })
  })


  router.get('/registerInstallation', (req, res)=> {
    var installation = new req.models.Installation();
    const device = req.query.device
    const token = req.query.token
    installation.platform = device
    installation.token = token
    if (req.user) {    
      installation.user = req.user
    }
    installation.save(function(err, obj) {
      if(res.abortIf(err, 'Could not save token and device and such things wo')) {
        return;
      }
      res.apiOK(obj);
    })
  })

  router.get('/saved', function(req, res) {
    req.models.Installation.find(function(err, found) {
      if (res.abortIf(err, 'Could not get shit')) {
        return;
      }
      res.apiOK(found);
    });
  })

}

// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)
}