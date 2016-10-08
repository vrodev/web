var fs = require("fs");
var helper = require('sendgrid').mail;
var from_email = new helper.Email('info@vroelevkar.se');
var to_email = new helper.Email('hello@jacobtilly.se');
var subject = 'TJA';
var meddelande;
meddelande = fs.readFileSync("./mail.html","utf8") //function(err, contents) { meddelande = contents; console.log(err); });
var content = new helper.Content('text/html', meddelande);
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
})