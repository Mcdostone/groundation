var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	return sequelize.define('building', {
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
};