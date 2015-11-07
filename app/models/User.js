var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	return sequelize.define('user', {
	  	idParse: {
	    	type: Sequelize.STRING,
	  	},
	  	url: {
		    type: Sequelize.STRING
	  	},
	  	filename: {
		    type: Sequelize.STRING
	  	}
	}, {
	  	freezeTableName: true
	});

};