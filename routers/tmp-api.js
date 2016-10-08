// tmp-api.js
// VRO Web

var express = require('express')

module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // /api/lol?name=Erik
  router.get('/clickedKilled', function(req, res) {
    var name = req.query.name // Erik
    
    res.json({
      error: false,
      message: "Loggade knapptryckning på knappen KILLED och skickade svar!",
    })
  })

  router.get('/clickedDied', function(req, res) {
    var name = req.query.name // Erik


    req.models.User.find(function(error, users) {
      var messageString = "";
        for(var i = 0; i < users.length; i++) {
           messageString += ", " + users[i].name;
        }
      console.log('found', arguments)
      res.json({
        error: false,
        message: "Loggade knapptryckning på knappen DIED och skickade svar!" +messageString,
        messageString: messageString
      })
    });
    
  })

  router.get('/resetCircle', function(req, res) {
    var name = req.query.name
    res.json({
      error: false,
      message: "Körde återskapa cirkel-funktionen med parametern "+name+"",
    })
  })

router.get('/getEmail', function(req, res) {
    req.models.User.find(function(error, users) {
      var emailString = "";
        for(var i = 0; i < users.length; i++) {
          emailString += users[i].email + ";";
        }
      console.log('found', arguments)
      res.json({
        error: false,
        messageString: emailString
      })
    });
    
  })

router.get('/sendEmail', function(req, res) {
    req.models.User.find(function(error, users) {
        for(var i = 0; i < users.length; i++) {
          // Kör e-postkoden.
          var fs = require("fs");
          var helper = require('sendgrid').mail;
          var from_email = new helper.Email('info@vroelevkar.se');
          var to_email = new helper.Email(users[i].email);
          var subject = 'Catcher 2016';
          // var meddelande;
          // meddelande = fs.readFileSync("./mail.html","utf8") //function(err, contents) { meddelande = contents; console.log(err); });
          var content = new helper.Content('text/plain', "Hejsan, "+users[i].name+"!\n Detta är ett testmeddelande från Catcher 2016, och din kod är"+users[i].loginCode+".\n Vänliga hälsningar,\n VRO Elevkår");
          var mail = new helper.Mail(from_email, subject, to_email, content);

          var sg = require('sendgrid')('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');
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
        }
      console.log('found', arguments)
      res.json({
        error: false,
        message: "Bör nu ha skickat e-postmeddelanden till e-postadresser i databasen."
      })
    });
    
  })


  // -----------
  return router;    
})();