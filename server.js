var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
app.set('port', (process.env.PORT || 5000));
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
	response.sendfile('client/index.html')
})

app.get('/plan', function(request, response) {
	response.sendfile('client/plan.html')
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port');
});

module.exports = app;