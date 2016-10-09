// errorPageHandler.js
// VRO Web
// 
// Initially created by Leonard Pauli, oct 2016

const config = require('../config')


// ----------------------------------------------------------------------
// 404 Not found handling
// Since this is the last non-error-handling
// middleware used, we assume 404, as nothing else
// responded.
module.exports = function(app) {

  // 422 and 500
  app.use(function (err, req, res, next) {
    // treat as 404
    // ~-1 == 0 -> false, all else -> true
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('errors/422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('errors/500', { error: err.stack, isDev:config.isDev });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('html')) return res.status(404).render('errors/404', payload);
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).send('Not found - 404');
  });
}