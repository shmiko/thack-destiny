'use strict';

var express = require('express');
var controller = require('./thing.controller');
var app = express();
var router = express.Router();

app.get('/?:cmd', controller.index);
function asdf(req, res) {
    
}
module.exports = controller.index;