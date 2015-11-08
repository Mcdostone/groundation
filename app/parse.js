var Parse = require('parse/node').Parse;
var configParse = require('../config/parse');

module.exports = function(installationId, message) {
	Parse.initialize(configParse.APPLICATION_ID, configParse.JAVASCRIPT_KEY, configParse.MASTER_KEY);

	var query = new Parse.Query(Parse.Installation);

	query.equalTo('installationId', installationId);

	Parse.Push.send({
		where : query,
  		data: { alert: message }
	},
		{ success: function() {
	    	console.log('notification sent');
	  	}, error: function(error) {
	  		console.log(error);
	    }
	});
}
