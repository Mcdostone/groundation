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

	User.sync({force: true}).then(function () {
  		User.create({
    		idParse: 'gjdgjkdkjfdgkjd'
  		});
	});

	return User;

};