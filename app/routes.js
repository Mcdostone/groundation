/**
* All routes of website.
*/
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.send("Hello world");
	})

}