"use strict";
// api/file.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express')
const path = require('path')
const fs = require('fs')

const photoFolder = path.resolve(__dirname+'/../../data/photos')
const busboy = require('connect-busboy');

// /api/upload
const route = router=> {
	router.use(busboy({
		limits: {fileSize: 10 * 1024 * 1024} // 10 MB
	}))

	router.get('/photo/:filename', (req, res)=> {
    const filepath = path.resolve(path.join(photoFolder, req.params.filename))
    if (filepath.substr(0,photoFolder.length)!=photoFolder) {
    	console.warn('BAD FILErequest: "'+req.params.filename+'"')
    	return res.status(404).send('Not found')}

    const stream = fs.createReadStream(filepath)

    stream.on('error', error=> {
    	//console.log("Caught", error);
    	res.status(404).send('Not found')
    });

    res.setHeader('Content-Type', 'image/png');
    stream.pipe(res)
	})

	router.post('/', function(req, res) {
		if (res.abortIf(!req.busboy, 'No file was received')) return;
		const obj = {files:[]}
		const warnings = []

		req.busboy.on('file', function(fieldname, file, filename) {
			if (fieldname != 'file') return warnings.push('Not accepting file at field "'+fieldname+'"');
			const fileObj = {}

			const generateRandomString = (length)=> {
				const charSet = 'abcdefghijklmnopqrstuvwxyz1234567890'
				let str = ''
				for (let i=0; i<length; i++)
					str += charSet[Math.round(Math.random()*(charSet.length-1))]
				return str }

			const endFileName = generateRandomString(24)
			file.pipe(fs.createWriteStream(photoFolder+'/'+endFileName))

			fileObj.name = filename
			fileObj.url = '/api/upload/photo/'+endFileName
			obj.files.push(fileObj)
		});

		// req.busboy.on('field', function(fieldname, value, valTruncated, keyTruncated) {
		//   console.dir({api:'/upload', got:'on:field', fieldname, value, valTruncated, keyTruncated});
		// });

		req.busboy.on('finish', function() {
			if (warnings.length) obj.warnings = warnings
			if (res.abortIf(!obj.files.length, 'No files uploaded', {warnings})) return;
			res.apiOK(obj)
		});

		req.pipe(req.busboy);
	})

}


// Register
module.exports = mainRouter=> {
	var router = express.Router();
	route(router)
	mainRouter.use('/upload', router)
}