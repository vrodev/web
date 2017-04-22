// authenticate.js
// VRO Web
// 
// Initially created by Leonard Pauli, oct 2016

var jwt = require('jwt-simple');


// ----------------------------------------------------------------------
// JWT - Authenticate
// for jwt, see https://www.sitepoint.com/using-json-web-tokens-node-js/
module.exports = function(req, res, next) {
    

// var maxAge = 3 * 31 * 24*60*60 * 1000
//   var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
//   res.cookie('jwtToken', token, { maxAge: maxAge, httpOnly: true });
// res.send("asdfsadf")
// return next();

  req.setLogout = function() {res.clearCookie('jwtToken')}
  function eraseAndContinue() {req.setLogout();next()}

  var token = req.cookies.jwtToken
  if (!token) return next()
  
  var decoded;
  try { var decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
  } catch (err) {return eraseAndContinue()}

  // Access token has expired
  if (decoded.exp <= Date.now())
    return eraseAndContinue()
  
  // Find user
  req.models.User.findOne({ _id: decoded.iss }).populate({
      path: 'memberships catcher.target',
      populate: {
        path: 'group',
      }
    }).exec(function(err, user) {
    if (err) return eraseAndContinue()
    req.user = user
    next()
  })
}