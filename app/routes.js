var parse = require('./parse');
var models = require('./models');
var multer = require('multer');
var config = require('../config/server');
var upload = multer({ dest: config.UPLOAD_DIR });
var disk = multer.diskStorage;
var JSON2Calendar = require('../JSON2Calendar');



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
	})



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
		var buildingId = req.body.buildingId;
		models.User.findOne({where: {idParse: idParse}}).then(function(user) {

			// never saved ...
			if(!user) {
				var user = models.User.build({ idParse: idParse, "buildingId": buildingId});

				user.save().then(function(u) {
					res.json(u);
				});
			}
			else {
				//user.updateAttributes({ 'idParse': dBuilding }).then(function(b) {});
				res.json(user);
			}
		});
	});

	app.get('/api/users', function(req,res) {
		models.User.findAll().then(function(users) {
				res.json(users)
		});
	});

	app.post('/api/users/:id/calendar',function(req, res) {
		var json = req.body.json;
		var id = req.params.id;

		JSON2Calendar(json, function(calendar) {
			JSON2Calendar.writer(calendar, function(filename) {
				models.User.findOne({where: {idParse: id}}).then(function(user) {
					if(user)
						user.updateAttributes({ 'filename': filename }).then(function(u) {res.json(u)});
					else 
					res.json(user);
				});
			});
		});
	});


	app.get('/api/buildings', function(req, res) {
		models.Building.findAll().then(function(buildings) {
				res.json(buildings)
		});
	});


	app.get('/api/buildings/:id', function(req, res) {
		models.Building.findById(req.params.id).then(function(building) {
			res.json(building);
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


}