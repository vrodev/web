"use strict";
// api/group.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {
	router.delete('/:id', function(req, res) {
		const id = req.params.id
		req.models.Group.findOneAndRemove({_id:id}, function(err) {
			if (res.abortIf(err, 'Could not delete post')) return;
			res.apiOK()
		})
	})	
}


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