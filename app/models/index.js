var Sequelize = require('sequelize');
var configDB = require('../../config/db');


// initialize database connection
var sequelize = new Sequelize(configDB.url);

// load models
var models = ['User', 'Building'];
models.forEach(function(model) {
  	module.exports[model] = sequelize.import(__dirname + '/' + model);
});


// describe relationships
(function(m) {
  	m.User.belongsTo(m.Building);
})(module.exports);


// export connection
module.exports.sequelize = sequelize;