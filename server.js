var express = require('express');
var routes = require('./app/routes');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var configDB  = require('./config/db');
var models = require('./app/models');
var helpers = require('express-helpers')

// Modules for view rendering
var helpers 	= require('express-helpers')
var ejs 		= require('ejs');
var engine 		= require('ejs-mate');


// Config of the server
var PORT = process.env.PORT || 3143;
// Create express instance, the base of the server.
var app = express();


app.set('view engine', 'ejs');
app.set("view options", {layout: false});
app.set('views', __dirname + '/views');
app.set('models', require('./app/models'));
app.engine('ejs', engine);

// Module for getting params in POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For css
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

routes(app);
helpers(app);


var sequelize = new Sequelize(configDB.database, configDB.user, configDB.password, {
  	host: 'localhost',
  	dialect: 'sqlite',
 	logging: false
});

models.sequelize.sync({force: true}).then(function () {
  	app.listen(PORT);
	console.log('Server is running : http://localhost:' + PORT);
});



