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
  	m.Building.hasMany(m.User);
})(module.exports);


// export connection
module.exports.sequelize = sequelize;

/*
var sequelize = new Sequelize(configDB.database, configDB.user, configDB.password, {
  	host: 'localhost',
  	dialect: 'sqlite',
 	logging: true
});

global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/User'),
    Building     sequelize.import(__dirname + '/Building')
  }

  global.db.User.hasMany(global.db.Plant)
  global.db.Plant.belongsTo(global.db.User)
  global.db.Plant.hasMany(global.db.Record)
  global.db.Record.belongsTo(global.db.Plant)
}

module.exports = global.db*/