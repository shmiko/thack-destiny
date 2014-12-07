var express = require('express');
var app = express();

module.exports = app.get('/hotels/:', function(req, res) {
    console.log(req);
});