// tmp-api.js
// VRO Web

var express = require('express')

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const awaitres = require('../helpers/helpers').awaitres;


// ------------------------------------------------------------------------
// Functions

var sendEmail = async (function(email, title, text) {
  // Kör e-postkoden.
  var sendgridKey = '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'
  var sendgrid    = require('sendgrid')
  var m           = sendgrid.mail
  var from        = new m.Email('odenplanselevkar@vrg.se')
  var to          = new m.Email(email)
  var subject     = title
  // var fs = require("fs");
  // var meddelande;
  // meddelande = fs.readFileSync("./mail.html","utf8") //function(err, contents) { meddelande = contents; console.log(err); });
  var content     = new m.Content('text/plain', text);
  var mail        = new m.Mail(from, subject, to, content);

  var sg = sendgrid(sendgridKey);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return await (sg.API(request))
})


// ------------------------------------------------------------------------
module.exports = (function() {
  var router = express.Router();
  // ---------------------------


  // ---------------------------
  // /api/lol?name=Erik
  router.get('/clickedKilled', function(req, res) {
    var name = req.query.name // Erik
    
    res.json({
      error: false,
      message: "Loggade knapptryckning på knappen KILLED och skickade svar!",
    })
  })


  // ---------------------------
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


  // ---------------------------
  router.get('/resetCircle', function(req, res) {
    var name = req.query.name
    res.json({
      error: false,
      message: "Körde återskapa cirkel-funktionen med parametern "+name+"",
    })
  })


  // ---------------------------
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


  // ---------------------------
  router.get('/sendEmail', function(req, res) {
    "use strict"; (async (function (){
    let sendError = (err, message) => {console.log(err);res.json({
      error: true, message: message}) }

    let users = awaitres (req.models.User.find(),sendError)
    if (!users) return;
    
    let count = users.length, i=0
    try {
      users.map(user => {
        let text = "Välkommen till spelet. Nu är det dags att hålla sig nära klasskamraterna för du kan när som helst, var som helst bli tagen.\n\nDet är dags för dig att få ditt offer. Du visar ditt offer genom att logga in på sidan (http://vroelevkar.se) och ange din kod. Din kod är:\n"+user.code+"\n\nNedan har du instruktionerna för spelet; hur du håller dig säker och hur du gör för att fånga dina offer.\n\nLYCKA TILL!\n\n🚩INSTRUKTIONER - CATCHER🚩\n\n🚩The Mission🚩\n☆ Ta reda på vem ditt offer är (Facebook, Schoolity…)\n☆ Osäkra ditt vapen genom att placera dig själv, stilla, minst fem meter ifrån ditt offer och ropa ”Catcher” så att omgivningen hör.\n☆ Gå (spring) fram till ditt offer och antingen krama hen eller lägg båda dina händer på offrets axlar.\n☆ Båda ska därefter ta fram appen och markera sig som tagen respektive mission accomplished.\n☆ Om en dispyt skulle ske, kontakta spelledaren (Nikol Kanavakis) på niko.kana-2017@vrg.se eller i skolan. Tips! Samla vittnen.\n\n🚩Methods of Defense🚩\nDu kommer undan att bli tagen genom att:\n☆ Krama någon annan än din catcher innan hen hunnit krama dig\n☆ Genom att lämna skolbyggnaden (springa ut genom en ytterdörr)\n☆ Genom att nå en så kallad Safe Zone\n\n🚩Safe Zones🚩\n☆ Sidh-salen och matsalskön (när det faktiskt är kö, inte annars...)\n☆ Hela våning fyra (där biblioteket ligger) samt trappan upp till våning fyra\n☆ UNDER LEKTIONSTID: Klassrum och grupprum – det är totalförbjudet att på något sätt störa en lektion!\n☆ Toalettområdena\n☆ Skolhälsan, lärarrum, rektorsrum och liknande\n☆ Hissar\n☆ Nödutgångar, nödtrappor och dylikt samt hela skolan i brandsituationer\n\n🚩 Keep in mind! 🚩\n☆ Jakten får endast ske inuti skolbyggnaden (VRG OPL), dock ej i safe zones.\n☆ Om du misslyckat med ett mordförsök får du inte försöka igen på en halvtimme.\n☆ Du får inte ta fysisk hjälp av någon när du jagar. Du får alltså inte använda dig av en kompanjon som håller fast ditt offer, håller igen en dörr etc. Dock får både du och kompanjoner lura ditt offer på villovägar.\n☆ Visa hänsyn till skolans personal och lärare. Stör inte undervisning, rusa inte in i klassrum där det pågår lektion. Detta innebär omedelbar diskvalificering.\n☆ Spelledaren har rätt att när som helst ändra regler och diskvalificera spelare. Ställ dig därför sex meter snarare än vad du tror är fem meter bort när du ska ropa CATCHER, så att det inte råder några tvivelaktigheter att du var på tillräckligt avstånd för ditt mord.\n☆Försök kom undan din fångare genom att spela smart och försiktigt. Du kan även försöka dölja din identitet. Nästan alla medel är tillåtna: hattar, förklädnader, hårfärgning, röstförvrängare. Heltäckande masker är dock förbjudet (förutom på Halloween)☆\n\nCatch’em all!"
        var emailRes = await (sendEmail(user.email, 'Catcher 2016', text))
        i++;
        console.log('Email response ('+i+'/'+count+'): ',
          emailRes.statusCode, emailRes.body, emailRes.headers)
      })

      res.json({
        error: false,
        message: "Bör nu ha skickat e-postmeddelanden till e-postadresser i databasen ("+count+")"
      })
    } catch(err) {
      return sendError(err, "Reached "+i+" of "+count)
    }
  }))()})


  // -----------
  return router;    
})();