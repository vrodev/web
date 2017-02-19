// config/development.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

module.exports = {
	isDev: true,
	// username:password@host:port
	db: 'mongodb://localhost:27017/testWeb',
	sendgridKey: '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',
	jwtTokenSecret: 'tHis7777SooasfdasdjSEEEEEcret',
	sendsEmails: false,
	logSendingEmails: true,
	webURL: 'http://localhost:3000',

	googleSigninClientId: '999516689966-k3v9rvienco8ftjhc81s4i05lu3utg5j.apps.googleusercontent.com',
	googleSigninClientSecret: 'GGo6x5g9FyDHFHuwNAm4btD9'

}