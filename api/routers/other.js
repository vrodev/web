"use strict";
// api/other.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express')
const food = require('../functions/food')


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
      res.json(foodData)
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

}

// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)
}