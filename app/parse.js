var Parse = require('parse/node').Parse;
var configParse = require('../config/parse');

module.exports = function(installationId, message) {
	Parse.initialize(configParse.APPLICATION_ID, configParse.JAVASCRIPT_KEY, configParse.MASTER_KEY);

	var query = new Parse.Query(Parse.Installation);

	query.equalTo('installationId', installationId);
	//query.equalTo('deviceToken', '161ba40bf138559d00a1a19ba088761602875d6f131049cfce89529bd56c83f7');

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
