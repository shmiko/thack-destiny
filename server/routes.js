/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var clist;
require('fs').readFile('./server/api/countriesToCities.json', function(err, data) {
    if(err)
        console.log(err);
    clist = JSON.parse(data);
});
module.exports = function(app) {

  // Insert routes below
  app.get('/api/things/:cmd', function(req, res) {
      console.log(req.params);
      res.send(clist[req.params.cmd]);
  });
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
