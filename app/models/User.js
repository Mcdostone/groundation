var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	var User = sequelize.define('user', {
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

	return User;

};