var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
	var Notification = sequelize.define('notification', {
	  	date: {
	    	type: Sequelize.DATE,
	  	}},
		{
	  		freezeTableName: true
		});

	return Notification;
};