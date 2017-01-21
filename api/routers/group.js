"use strict";
// api/group.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {}


// /api/group
const route = router=> {


}


// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)

  var router = express.Router();
  route(router)
	mainRouter.use('/group', router)
}