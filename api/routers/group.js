"use strict";
// api/group.js
// VRO Web
// LETS MAKE API GREAT AGAIN

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

	router

	// returnerar alla grupper
	.get('/', (req, res)=> {

	})

	// returnerar information för grupp med id :id
	.get('/:id', (req, res)=> {
		
	})

	// Skapa grupp
	.post('/', (req, res)=> {
		
	})

	// uppdatera grupp
	.put('/:id', (req, res)=> {
		
	})

	// radera grupp
	.delete('/:id', (req, res)=> {
		
	})

	// visa alla användare i en grupp
	.get('/:id/users', (req, res)=> {
		
	})

	// stoppa in användare med :id i grupp med id :id
	.post('/:gid/users/:uid', (req, res)=> {
		
	})

	// uppdatera inställningar för användare med id :id i grupp med id :id
	.put('/:gid/users/:uid', (req, res)=> {
		
	})

	// banna idiot
	.delete('/:gid/users/:uid', (req, res)=> {
		
	})

}


// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)

  var router = express.Router();
  route(router)
	mainRouter.use('/group', router)
}