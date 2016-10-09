// helpers.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const config = require('../config');
const clc = require('cli-color');


// ----------------------------------------------------------------------
// Generall

module.exports.generateSimpleCode = function(count) {
	var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	var text = ""
	for (var i = 0; i<count; i++)
		text += possible[Math.floor(Math.random()*possible.length)]
	return text;
}

// const Promise = require('bluebird')
// const assert = require('assert')
// Usage: var res; if (!(res = awaitres ( asyncFn, onErrorFn ))) return;
module.exports.awaitres = function(fn, onError) { return await (async (() => {
	var res; await (fn.then(r=>res=r,onError)); return res;})())}


// ----------------------------------------------------------------------
// DB
const mongoose = require('mongoose')

module.exports.mongooseRef = function(modelName, opt) {
	return { type:mongoose.Schema.ObjectId, ref:modelName }
}


// ------------------------------------------------------------------------
// Functions

const renderTemplate = module.exports.renderTemplate = (template, data) => {
  const jade = require('jade')
  const path = require('path')
  return jade.renderFile(path.join(config.viewTemplates, template+'.jade'), data)
}


// ------------------------------------------------------------------------
// Functions

// Sends an email using sendgrid
// sender email defined in config
// if jade template file is "templates/emails/my-email.jade",
//  then template is "my-email"
// if template has "Name: #{name}",
//  then templateData is {name:'a name'}
// Using async: try { var emailRes = await (sendEmail(...)); } catch(err) {}
module.exports.sendEmail = async (function(email, title, template, templateData) {
  const sendgrid = require('sendgrid')
  const sender = sendgrid(config.sendgridKey);
  const m = sendgrid.mail

  // Email properties
  const props = {
    from:     new m.Email(config.fromEmail),
    to:       new m.Email(email),
    subject:  title,
    html: renderTemplate('emails/'+template, templateData)
  }

  // Set as plain text is wanted
  var content;
  const tag = '<onlyText>'
  if (props.html.substring(0,tag.length)==tag) {
    props.html = (s=>s.substring(tag.length,s.length-'</onlyText>'.length))(props.html)
    content = new m.Content('text/plain', props.html);
  } else content = new m.Content('text/html', props.html);
  // var content = new m.Content('text/plain', props.html);

  // Construct email
  const mail = new m.Mail(props.from, props.subject, props.to, content);

  // Log and just pretend to send if config approves
  if (!config.sendsEmails) {
    console.log(clc.bgBlackBright.black('(Pretending)')+
      clc.white(' Sending email "'+template+'" to "'+email+'"'))
    return await (Promise.resolve({
      statusCode: 202,
      body: 'Not actually sending the email according to config',
      devProps: props
    }))
  }

  // Construct send request
  const request = sender.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON() })

  // Log
  if (config.logSendingEmails) console.log(clc.white(
    'Sending email "'+template+'" to "'+email+'"'))

  // Perform send request
  return await (sender.API(request))
})