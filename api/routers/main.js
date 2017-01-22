"use strict";
// api/router.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')

module.exports = (function() {
  var router = express.Router();

  require('./catcher')(router)
  require('./user')(router)
  require('./post')(router)
  require('./group')(router)
  require('./file')(router)
  require('./other')(router)
  
  return router;    
})();