var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	var Building = sequelize.define('building', {
	  	name: {
	    	type: Sequelize.STRING,
	  	},
	  	address: {
			type: Sequelize.STRING
		},
		town: { type: Sequelize.STRING, defaultValue: ''},
		longitude: {type: Sequelize.DOUBLE},
		latitude: {type: Sequelize.DOUBLE},
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
    		address: 'Nancy',
    		latitude: 48.66912,
    		longitude: 6.15540
  		});
	});

	return Building;
};