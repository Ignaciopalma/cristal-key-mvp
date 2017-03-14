var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var uriDev = 'mongodb://localhost'
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
	UserData.find().then(function(result){
		console.log(result);
	})
});

app.post('/users/getUser', function(req, res, next) {
	console.log('get user request', req.body)
	UserData.findOne({"username": req.body.username}, function(err, result) {
		if(err) {
			console.log(err);
		} else if (result === null) {
			res.send({userData: []});
		} else {
			res.send({userData: result.destinations});
		}
	})
});

app.post('/users', function(req, res, next) {
	console.log('post request comming in...')
	console.log(req.body)
	
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    if (err){
      console.error(err);
    } else {			
	    var user = {
				username: req.body.username,
				password: hash,
				destinations: req.body.destinations		
			}

			var data = new UserData(user);
			data.save();			
			res.send({redirect: '/main', username: req.body.username})
    }
  });  
  
});

app.post('/signin', function(req, res, next) {
	console.log('sign in request', req.body)
	UserData.findOne({"username": req.body.username}, function(err, user) {
		console.log(user)
	  bcrypt.compare(req.body.password, user.password, function(err, result) {
	  	console.log(result);
      if (err){
        console.log(err);        
      } else {
      	console.log('auth success');
      	res.send({redirect: '/main', username: req.body.username})
      }
    });
	})
});


app.post('/users/update', function(req, res, next) {
	console.log('update request comming in...')
	console.log(req.body)

	UserData.findOneAndUpdate(
    {'username': req.body.username},
    {$push: {"destinations": req.body.newDestination}},
    {safe: true, upsert: true},
    function(err, model) {
    	if(err) {
        console.log(err);
    	} else {
    		console.log('updated successfully')
    	}
    }
	);

  res.status(200).send('all good')
})




module.exports = app;