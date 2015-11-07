var parse = require('./parse');
var models = require('./models');


/**
* All routes of website.
*/
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index');
	});


	app.get('/notif', function(req, res) {
		res.render('test');
	});

	app.post('/notif', function(req, res) {
		// Here put the code which push the notif on the device.
		parse('161ba40bf138559d00a1a19ba088761602875d6f131049cfce89529bd56c83f7', req.body.notification);
		res.redirect('/');
	});


	app.post('/create', function(req, res) {
		var building = models.Building.build({ name: req.body.name, address: req.body.address});

		building.save().then(function(b) {})
		.catch(function(error) {
    		console.log(error)
  		});

  		res.redirect('/');
	})


	app.get('/create', function(req,res) {
  		res.render('create');
	});


	app.get('/buildings', function(req,res) {
		models.Building.findAll().then(function(buildings) {
			if(buildings)
				res.render('buildings', {'buildings' : buildings});
			else
				redirect('/');
		})
	});

}