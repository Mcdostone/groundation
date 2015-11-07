var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	var Building = sequelize.define('building', {
	  	name: {
	    	type: Sequelize.STRING,
	    	field: 'name'
	  	},
	  	address: {
		    type: Sequelize.STRING
	  	}
	}, {
	  	freezeTableName: true
	});

	Building.sync({force: true}).then(function () {
  		// Table created
  		return Building.create({
    		name: 'prout',
    		lastName: 'Hancock'
  		});
	});

	return Building;
};