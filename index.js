var express = require('express');
var mongoose = require('mongoose');

var app = express();
// app.set('view engine', 'html');

app.get('/', function(request, response) {
	response.sendfile('client/index.html')
})

app.listen(8000, function() {
  console.log('Node app is running on port 8000');
});

module.exports = app;