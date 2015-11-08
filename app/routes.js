var parse = require('./parse');
var models = require('./models');
var multer = require('multer');
var config = require('../config/server');
var upload = multer({ dest: config.UPLOAD_DIR });
var disk = multer.diskStorage;
var moment = require('moment');
var JSON2Calendar = require('../JSON2Calendar');
var fs = require('fs');
var path = require('path');
var nominatim = require('nominatim');


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

	app.get('/tmp', function(req, res) {
		res.render('upload');
	});



	/** 
	 * URLs for buildings actions
	 */
	app.get('/buildings/new', function(req, res) {
		res.render('createBuilding');
	});


	app.post('/buildings', function(req, res) {
		var building = models.Building.build({ name: req.body.name, address: req.body.address, town: req.body.town});

		building.save().then(function(b) {})
		.catch(function(error) {
    		console.log(error);
  		});

  		res.redirect('/buildings');
	});


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
		var id = req.body.idParse;
		var bId = req.body.idBuilding;
		
		models.User.findOne({where: {idParse: id}}).then(function(user) {
			// never saved ...
			console.log(user);
			if(!user) {
				var user = models.User.build({ idParse: id, buildingId: bId});

				user.save().then(function(u) {
					res.json(u);
				});
			}
			else {
				user.updateAttributes({ 'buildingId': bId }).then(function(u) {
					res.json(u);
				});
			}
		});
	});

	app.get('/api/users', function(req,res) {
		models.User.findAll().then(function(users) {
				res.json(users)
		});
	});

	app.get('/api/users/:id', function(req,res) {
		var id = req.params.id;
		models.User.findOne({where: {idParse: id}}).then(function(user) {
			res.json(user);
		});
	});

	app.post('/api/users/:id/notify', function(req, res) {
		models.User.findOne({where: {idParse: req.params.id}}).then(function(user) {
			if(user) {
				var canSend = true;
				var now = moment();
				var last = moment(user.lastNotification);

				if(user.lastNotification) {
					canSend = now.isAfter(last.add(config.DELAY.value,config.DELAY.unity));
				}

				if(canSend) {
					parse(req.params.id, req.body.notification);
					user.updateAttributes({ 'lastNotification': new Date() }).then(function(u) {});
				}

				res.json(user);
			}
			
		});
	});

	app.post('/api/users/:id/calendar',function(req, res) {
		var json = req.body.json;
		var id = req.params.id;

		JSON2Calendar(json, function(calendar) {
			JSON2Calendar.writer(calendar, function(filename) {
			
				models.User.findOne({where: {idParse: id}}).then(function(user) {
					if(user) {

						if(user.filename) {
							var filepath = path.join(config.UPLOAD_DIR, user.filename);
							if(filepath)
								fs.unlink(filepath)
						}

						user.updateAttributes({ 'filename': filename }).then(function(u) {res.json(u)});
					}
					else 
						res.json(user);
				});
			});
		});
	});


	app.get('/api/buildings', function(req, res) {
		getBuildingsAndUsers(function(buildings) {
			res.json(buildings);
		});
	});


	app.get('/api/buildings/:id', function(req, res) {
		models.Building.findById(req.params.id).then(function(building) {
			res.json(building);
		});
	});


	app.post('/api/buildings', function(req, res) {
		var building = models.Building.build({ name: req.body.name, address: req.body.address, town: req.body.town});
		if(req.body.address) {
			console.log(building.town);
			nominatim.search({ q: building.address}, function(err, opts, results) {
				if(err) console.log(err);
  				console.log(results);
			});
		}
		
		building.save().then(function(b) {
			res.json(b)
		})
		.catch(function(error) {
    		console.log(error);
  		});
	});


	app.post('/api/buildings/:id/calendar', upload.single('file') ,function(req, res, next) {
		var url = req.body.url;
		var file = req.file;
		var json = req.body.json;

		models.Building.findById(req.params.id).then(function(data) {

			if(data) {
				if(url && data)
					data.updateAttributes({ 'url': url }).then(function(b) {});
				if(file && data) 
					data.updateAttributes({ 'filename': file.filename }).then(function(b) {});

				res.json(data);
			}
    	});
	});

	/*app.get('/api/buildings/:id/users', function(req, res) {
		getBuildingsAndUsers(function(buildings) {
			res.json(buildings);
		});
	})*/


	app.get('/locate', function(req, res) {
		res.render('tmp');
	})


	function getBuildingsAndUsers(cb) {
		models.Building.findAll({ 
			include: [{ model: models.User }]
		}).then(cb);
	}

}