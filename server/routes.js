var bcrypt = require('bcrypt-nodejs');
var userController = require('./controllers/users')

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendfile('client/index.html')
	})

	app.get('/users', userController.users);
	app.get('/users/:username', userController.getUser)
	app.post('/sign-up', userController.createUser)
	app.post('/signin', userController.signIn)
	app.post('/users/update', userController.updateDestinations)
}