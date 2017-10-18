var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var uriDev = 'mongodb://localhost/cristal-keys'
var uriProd = 'mongodb://ignacio:firstdata@ds131480.mlab.com:31480/cristal-key-db';
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development') {
	mongoose.connect(uriDev, function (err, res) {
	  if (err) {
	  console.log ('ERROR connecting to: ' + uriDev + '. ' + err);
	  } else {
	  console.log ('Succeeded connected to: ' + uriDev);
	  }
	});
} else {
	mongoose.connect(uriProd, function (err, res) {
	  if (err) {
	  console.log ('ERROR connecting to: ' + uriProd + '. ' + err);
	  } else {
	  console.log ('Succeeded connected to: ' + uriProd);
	  }
	});
}


var app = express();
app.use(bodyParser.json())

require('./server/routes')(app)

app.set('port', (process.env.PORT || 3000))
app.use(express.static(path.join(__dirname, '/')))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port..', app.get('port'))
})
