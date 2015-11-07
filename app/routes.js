var parse = require('./parse');
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


	app.get('/buildings', function(req,res) {
		var buildings = ['Telecom Nancy', 'Fac de sciences'];
		res.json(JSON.stringify(buildings));
		//res.send(JSON.stringify(buildings));
		//res.redirect('/');

	})

}