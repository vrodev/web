"use strict";
// api/post.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {


}


// /api/post
const route = router=> {
	router.get('/', function(req, res){
		res.apiOK('hejhej')
	})

}


// Register
module.exports = mainRouter=> {
  routeMain(mainRouter)

  var router = express.Router();
  route(router)
  mainRouter.use('/post', router)
}