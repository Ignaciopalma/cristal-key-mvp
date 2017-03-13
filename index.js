var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.get('/', function(request, response) {
	response.render('pages/index')
})

app.listen(8000);

module.exports = app;