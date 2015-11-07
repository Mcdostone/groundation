var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	var Building = sequelize.define('building', {
	  	name: {
	    	type: Sequelize.STRING,
	  	},
	  	address: {
		    type: Sequelize.STRING
	  	},
	  	url: {
		    type: Sequelize.STRING
	  	},
	  	filename: {
		    type: Sequelize.STRING
	  	}
	}, {
	  	freezeTableName: false
	});

	Building.sync({force: true}).then(function () {
  		Building.create({
    		name: 'Telecom Nancy',
    		address: 'Nancy'
  		});
	});

	return Building;
};