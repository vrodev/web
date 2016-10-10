"use strict";
// Test import
const fs = require('fs')
fs.readFile('imp.csv', 'utf8', (err, contents) => {
	if (err) return console.log(1, err);
	require('./importUsers').importUsersFromCSV(contents).then(console.log, console.log)
})