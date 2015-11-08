var Sequelize = require('sequelize');
var configDB = require('../../config/db');


// initialize database connection
var sequelize = new Sequelize(configDB.url);

// load models
var models = ['Building', 'User', 'Notification'];
models.forEach(function(model) {
  	module.exports[model] = sequelize.import(__dirname + '/' + model);
});


// describe relationships
(function(m) {
  m.Building.hasMany(m.User);
  m.User.belongsTo(m.Building);

  /*m.User.hasMany(m.Notification);
  m.Notification.belongsTo(m.User);*/
})(module.exports);


// export connection
module.exports.sequelize = sequelize;