var Parse = require('parse/node').Parse;
var configParse = require('../config/parse');

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
		Parse.initialize(configParse.APPLICATION_ID, configParse.JAVASCRIPT_KEY, configParse.MASTER_KEY);

		var query = new Parse.Query(Parse.Installation);

		query.equalTo('deviceToken', '161ba40bf138559d00a1a19ba088761602875d6f131049cfce89529bd56c83f7');

		Parse.Push.send({
			where : query,
  			data: { alert: "The Giants won against the Mets 2-3." }
		},
		{ success: function() {
    		console.log('notification sent');
  		}, error: function(error) {
  			console.log(error);
    	}
		});
		res.redirect('/');
	});

}