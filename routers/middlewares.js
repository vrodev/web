// middlewares.js
// VRO Web
// 
// Initially created by Leonard Pauli, oct 2016


// 404 Not found handling
// Since this is the last non-error-handling
// middleware used, we assume 404, as nothing else
// responded.
module.exports.errorPageHandler = function(req, res, next) {
  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('error404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
}