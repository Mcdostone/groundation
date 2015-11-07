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



	/** 
	 * URLs for buildings actions
	 */
	app.get('/buildings/new', function(req, res) {
		res.render('createBuilding');
	})


	app.post('/buildings', function(req, res) {
		var building = models.Building.build({ name: req.body.name, address: req.body.address});

		building.save().then(function(b) {})
		.catch(function(error) {
    		console.log(error);
  		});

  		res.redirect('/');
	})


	app.get('/buildings', function(req,res) {
		models.Building.findAll().then(function(buildings) {
			if(buildings) {
				res.render('buildings', {'buildings' : buildings});
			}
			else
				redirect('/');
		});
	});


	app.get('/buildings/:id', function(req,res) {
		models.Building.findById(req.params.id).then(function(building) {
			if(building) {
				res.render('building', {'building': building});
			}
			else
				res.redirect('/');
		});
	});



	/** 
	 * URLs for User
	 */

	 app.post('/api/users', function(req,res) {
		var idParse = req.body.idParse;
		var idBuilding = req.body.idBuilding;
		models.User.findOne({where: {idParse: idParse}}).then(function(user) {

			// never saved ...
			if(!user) {
				var user = models.User.build({ idParse: idParse, idBuilding: idBuilding});

				user.save().then(function(u) {
					res.json(u);
				});
			}
			else
				res.json(user);

		});
	});


	app.get('/api/buildings', function(req, res) {
		models.Building.findAll().then(function(buildings) {
				res.json(buildings)
		});
	});


}