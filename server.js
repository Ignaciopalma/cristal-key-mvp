var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost';

mongoose.connect(uristring);

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  destinations: {
  	type: Array
  }
});

var UserData = mongoose.model('UserData', UserSchema);

var app = express();
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/')));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port');
});


app.get('/', function(req, res) {
	res.sendfile('client/index.html')
});

app.get('/users', function(req, res, next) {
	console.log(res.body)
	UserData.find().then(function(result){
		console.log(result);
	})
})

app.post('/users', function(req, res, next) {
	console.log('post request comming in...')
	console.log(req.body)

	var user = {
		username: req.body.username,
		password: req.body.password,
		destinations: req.body.destinations		
	}

	var data = new UserData(user);
	data.save();
})



module.exports = app;