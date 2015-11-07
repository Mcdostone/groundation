var Sequelize = require('sequelize');
var configDB = require('../../config/db');


// initialize database connection
var sequelize = new Sequelize(configDB.url);

// load models
var models = ['Building', 'User'];
models.forEach(function(model) {
  	module.exports[model] = sequelize.import(__dirname + '/' + model);
});


// describe relationships
(function(m) {
  	m.User.hasOne(m.Building);
  	m.Building.belongsTo(m.User);
})(module.exports);


// export connection
module.exports.sequelize = sequelize;