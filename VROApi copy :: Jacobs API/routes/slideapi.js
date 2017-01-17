var express = require('express');
var router = express.Router();
var User = require('../lib/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/update/:id', function(req, res) {
	var id = req.params.id;
});

module.exports = router;