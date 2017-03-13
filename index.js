var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.set('port', (process.env.PORT || 5000));
// app.set('view engine', 'html');

app.get('/', function(request, response) {
	response.sendfile('client/index.html')
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port');
});

module.exports = app;