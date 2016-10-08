// authenticate.js
// VRO Web
// 
// Initially created by Leonard Pauli, oct 2016

var jwt = require('jwt-simple');


// ----------------------------------------------------------------------
// JWT - Authenticate
module.exports = function(req, res, next) {
  function eraseAndContinue() {res.clearCookie('jwtToken');next()}

  function tryLogin() {
    var loginHeader = req.headers['x-login-code'] || req.query.xLoginCode
    if (!loginHeader) return eraseAndContinue()
    req.models.User.findOne({ loginCode: loginHeader }, function(err, user) {
      // user not found 
      if (err) { 
        return res.sendStatus(401);
      // incorrect loginCode
      } else if (!user) {
        return res.sendStatus(401);
      }
    
      // if (!user.validPassword(password)) {
      //   // incorrect password
      //   return res.send(401);
      // }
    
      // User has authenticated OK
      var maxAge = 3 * 31 * 24*60*60 * 1000
      var token = jwt.encode({
        iss: user.id,
        exp: Math.abs(new Date()) + maxAge
      }, res.app.get('jwtTokenSecret'));
      res.cookie('jwtToken', token, { maxAge: maxAge, httpOnly: true });

      req.user = user
      next()
    });
  }

  var token = req.cookies.jwtToken || req.headers['x-access-token']
  if (!token) return tryLogin()
  var decoded;
  try { var decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
  } catch (err) {return eraseAndContinue()}

  // Access token has expired
  if (decoded.exp <= Date.now())
    return eraseAndContinue()
  
  // Find user
  req.models.User.findOne({ _id: decoded.iss }, function(err, user) {
    if (err) return eraseAndContinue()
    req.user = user
    next()
  })
}