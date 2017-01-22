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

    // Use cached data if available
    const msInDay = 1000*60*60*24
    if (food.lastSaved !== undefined
    	&& (new Date() - food.lastSaved) < msInDay){
      callback(food.saved, true)
      return
    }

    // Fetch raw food data
    food.fetchRawFoodData(callback)
  })


  router.get('/registerToken', (req, res)=> {
    const device = req.query.device
    const token = req.query.token
    savedData.device = device
    savedData.token = token
    res.apiOK()
  })

  router.get('/saved', (req, res)=> res.apiOK(savedData))

}

// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)
}