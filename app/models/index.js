var Sequelize = require('sequelize');
var configDB = require('../../config/db');


// initialize database connection
var sequelize = new Sequelize(configDB.url);

// load models
var models = ['Building'];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});


// export connection
module.exports.sequelize = sequelize;