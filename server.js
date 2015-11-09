var express = require('express');
var api = require('./app/api');
var Sequelize = require('sequelize');
var configDB  = require('./config/db');
var models = require('./app/models');
var bodyParser = require('body-parser');


// Config of the server
var PORT = process.env.PORT || 3143;


// Create express instance, the base of the server.
var app = express();
var router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', api(router));



var sequelize = new Sequelize(configDB.database, configDB.user, configDB.password, {
  	host: 'localhost',
  	dialect: 'sqlite',
 	logging: false
});

models.sequelize.sync({force: true}).then(function () {

	/*models.Building.create({
    	name: 'Telecom Nancy',
    	address: '193 Avenue Paul Muller, 54602 Villers-lès-Nancy, France',
      town: 'Villers-lès-Nancy',
    	latitude: 48.66912,
    	longitude: 6.15540
  	});*/

  app.listen(PORT);
	console.log('Server is running : http://localhost:' + PORT);
});
