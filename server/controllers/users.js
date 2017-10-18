var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs');

exports.users = function(req, res, next) {
	User.find().then(function(result){
		console.log(result);
	})
}

exports.getUser = function(req, res, next) {
	if(req.params.username === 'undefined') {
		res.send({userData: []});
	} else {
		User.findOne({"username": req.params.username}, function(err, result) {
			if(err) {
				console.log(err);
			} else if (result === null) {
				console.log('result null')
			} else {
				res.send({userData: result.destinations});
			}
		})
	}
}

exports.createUser = function(req, res, next) {
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    if (err){
      console.error(err)
    } else {
	    var user = {
				username: req.body.username,
				password: hash
			}

			var data = new User(user);
			data.save(function(err, newUser) {
				if(err) {
					console.log(err)
				}	else {
					console.log('new user created', newUser)
					res.send({redirect: '/main', username: req.body.username})
				}
			});
    }
  })
}

exports.signIn = function(req, res, next) {
	User.findOne({"username": req.body.username}, function(err, user) {
		res.send({redirect: '/main', username: req.body.username})
	  // bcrypt.compare(req.body.password, user.password, function(err, result) {
   //    if (err){
   //      console.log(err);
   //    } else {
   //    	res.send({redirect: '/main', username: req.body.username})
   //    }
   //  })
	})
}

exports.updateDestinations = function(req, res, next) {
	User.findOneAndUpdate(
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
	)

	res.status(200).send('all good')
}