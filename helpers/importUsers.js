"use strict";
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const generateSimpleCode = require('./helpers/helpers').generateSimpleCode;

var models = require('./helpers/db-connect').models
const clc = require('cli-color');


// Parse csv file into json
const parseCSV = module.exports.parseCSV = function(csv) {
	let rows = csv.split('\n')
	const titleRow = rows.splice(0,1)[0]
	const titleCols = titleRow.split('\t')

	const objs = rows.map(row => {
		const cols = row.split('\t')
		let obj = {}

		for (let i=0; i<Math.min(cols.length, titleCols.length); i++)
			obj[titleCols[i]] = cols[i]

		return obj
	})

	return objs
}

// Using csv title row:
// timestamp	firstname	lastname	line	graduationYear	email	paymentOption	paid
const usersFromCSVObjs = module.exports.usersFromCSVObjs = function(objs) {
	let i = 0
	let users = objs.map(obj => {
		const user = new models.User()
		user.name = obj.firstname+' '+obj.lastname
		user.email = obj.email
		user.loginCode = generateSimpleCode(6)

		if (!user.catcher) user.catcher = {}
    user.catcher.paymentOption = obj.paymentOption 
    user.catcher.paid = obj.paid.toLowerCase()==='ja'
    user.catcher.paidAt = new Date(obj.timestamp.replace(' ', 'T').replace(/\./g, ':'))

		i++
		if (i>1) {
			process.stdout.write(clc.move.up(1));
			process.stdout.write(clc.erase.line);
		}
		console.log(clc.white('importing users ')+clc.bgBlackBright.black('('+[i,objs.length].join('/')+')'))
		return user
	})

	return users
}

const saveUsers = module.exports.saveUsers = async (function(objs) {
	let i = 0
	objs.map(obj => {
		await (obj.save())
		
		i++
		if (i>1) {
			process.stdout.write(clc.move.up(1));
			process.stdout.write(clc.erase.line);
		}
		console.log(clc.white('saving users ')+clc.bgBlackBright.black('('+[i,objs.length].join('/')+')'))
	})
})

const importUsersFromCSV = module.exports.importUsersFromCSV = async (function(csv) {
	const userObjs = parseCSV(contents)
	const users = usersFromCSVObjs(userObjs)
	await saveUsers(users)
})


// Test import
// const fs = require('fs')
// fs.readFile('imp.csv', 'utf8', (err, contents) => {
// 	if (err) return console.log(1, err);
// 	importUsersFromCSV(contents).then(console.log, console.log)
// })