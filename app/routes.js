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
		console.log("Notification pushed!\n");
		res.redirect('/');
	});

}