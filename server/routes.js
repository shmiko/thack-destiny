/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var http = require('http');

var Client = require('node-rest-client').Client;

var client = new Client();

var clist;
require('fs').readFile('./server/api/countriesToCities.json', function(err, data) {
    if(err)
        console.log(err);
    clist = JSON.parse(data);
});
module.exports = function(app) {

  // Insert routes below
  app.get('/api/things/:cmd', function(req, res) {
      res.send(clist[req.params.cmd]);
  });
    
    app.get('/api/amadeus/:cmd', function(req, res) {
        console.log("hotels")
        console.log(req.query);
        
        if(req.params.cmd === 'hotels') {
            console.log("hotels it is");
            client.get('http://api.travelinnovationsandbox.com/v1.2/hotels/search-circle?check_in=' + req.query.check_in + '&check_out=' + req.query.check_out + '&latitude='+ req.query.latitude + '&longitude=' + req.query.longitude + '&radius=10', function(data, response){
            // parsed response body as js object
            res.send(data);
        });
        } else if(req.params.cmd === 'airport') {
            client.get('http://api.travelinnovationsandbox.com/v1.2/airports/nearest-relevant?latitude='+ req.query.latitude + '&longitude=' + req.query.longitude, function(data, response){
            // parsed response body as js object
            res.send(data);
        });
        } else if(req.params.cmd === 'flight') {
            
            client.get('http://api.travelinnovationsandbox.com/v1.2/flights/extensive-search?origin=' + req.query.origin + '&destination=' + req.query.destination, function(data, response){
            // parsed response body as js object
            res.send(data);
        });
        } else if(req.params.cmd === 'airportpickup') {
            
            client.get('http://api.travelinnovationsandbox.com/v1.2/cars/search-airport?pick_up=' + req.query.date + '&location=' + req.query.location, function(data, response){
            // parsed response body as js object
            
            res.send(data);
                });
        } else if(req.params.cmd === 'cabsearch') {
                client.get('http://api.travelinnovationsandbox.com/v1.2/cars/search-circle?pick_up=' + req.query.date + '&latitude='+ req.query.latitude + '&longitude=' + req.query.longitude + '&radius=10', function(data, response){
            // parsed response body as js object
            res.send(data);
                });
            } else if(req.params.cmd === 'nearestrail') {
                    client.get('http://api.travelinnovationsandbox.com/v1.2/rail-stations/nearest-relevant?latitude='+ req.query.latitude + '&longitude=' + req.query.longitude, function(data, response){
            // parsed response body as js object
            res.send(data);
                });
            } else if(req.params.cmd === 'railextsearch') {
                client.get('http://api.travelinnovationsandbox.com/v1.2/trains/extensive-search?origin='+ req.query.originid + '&destination=' + req.query.destid + '&departure_date=' + req.query.date, function(data, response){
            // parsed response body as js object
            res.send(data);
                });
            }
        
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
