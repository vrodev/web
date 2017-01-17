var express = require('express');
var router = express.Router();
var Utskott = require('../lib/Utskott');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/healthcheck', function(req, res) {
	res.status(200).send({status:"OK"});
});

module.exports = router;