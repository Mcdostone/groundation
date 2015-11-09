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
module.exports = function(router) {


	/** 
	 * URLs for User
	 */
	router.get('/users', function(req,res) {
		models.User.findAll().then(function(users) {
			res.json(users);
		});		
	});

	
	router.post('/users', function(req,res) {
		var id = req.body.parseId;
		var bId = req.body.buildingId;
		
		models.User.findOne({where: {parseId: id}}).then(function(user) {
			// never saved ...
			console.log(user);
			if(!user) {
				var user = models.User.build({ parseId: id, buildingId: bId});

				user.save().then(function(u) {
					res.json(u);
				});
			}
			else {
				user.updateAttributes({ buildingId: bId }).then(function(u) {
					res.json(u);
				});
			}
		});
	});

	
	router.get('/users/:id', function(req,res) {
		var id = req.params.id;
		models.User.findOne({where: {idParse: id}}).then(function(user) {
			res.json(user);
		});
	});

	router.get('/users/:id/notify', function(req, res) {
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

	router.post('/users/:id/calendar',function(req, res) {
		var json = req.body.json;
		var id = req.params.id;

		JSON2Calendar(json, function(calendar) {
			JSON2Calendar.writer(calendar, function(filename) {
			
				models.User.findOne({where: {idParse: id}}).then(function(user) {
					if(user) {

						if(user.filename)
							deleteOldCalendar(user.filename);
						
						user.updateAttributes({ 'filename': filename }).then(function(u) {res.json(u)});
					}
					else 
						res.json(user);
				});
			});
		});
	});




	/* 
	 * Urls for buildings
	 */
	router.get('/buildings', function(req, res) {
		getBuildingsAndUsers(function(buildings) {
			res.json(buildings);
		});
	});


	router.get('/buildings/:id', function(req, res) {
		models.Building.findById(req.params.id).then(function(building) {
			res.json(building);
		});
	});


	router.post('/buildings', function(req, res) {
		var building = models.Building.build({ name: req.body.name, address: req.body.address, town: req.body.town, latitude: req.body.lat, longitude: req.body.long});
		if(req.body.address) {
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



	router.post('/buildings/:id/calendar', upload.single('file') ,function(req, res, next) {
		var url = req.body.url;
		var file = req.file;
		var json = req.body.json;

		models.Building.findById(req.params.id).then(function(data) {

			if(data && file) {
				if(data.filename)
					deleteOldCalendar(data.filename);
					
				data.updateAttributes({ 'filename': file.filename }).then(function(b) {});

				res.json(data);
			}
    	});
	});

	

	function getBuildingsAndUsers(cb) {
		models.Building.findAll({ 
			include: [{ model: models.User }]
		}).then(cb);
	}

	function deleteOldCalendar(filename) {
		var filepath = path.join(config.UPLOAD_DIR, filename);
		fs.unlink(filepath)
	}

	return router;

}