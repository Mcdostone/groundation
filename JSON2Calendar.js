var ical = require('ical-generator');
var config = require('./config/server');
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');

module.exports = function(json, cb) {

	 // Create new Calendar and set optional fields 
    cal = ical({});
 
	for(i in json) {
		var tmp  = json[i];

		cal.createEvent({
	    	start: new Date(tmp.startDate),
    		end: new Date(tmp.endDate),
    		summary: tmp.title,
    		location: 'tmp.location',
		});
		
		/*event.setSummary(tmp.title);

		event.setDate(new Date(tmp.startDate), new Date(tmp.endDate));
		event.setLocation(tmp.location);

		ical.addComponent(event);*/
	}

	cb(cal);
};

module.exports.writer = function(calendar, cb) {
	getFilename(function(err, filename) {
		if(err) return console.log(err);
		var filepath = path.join(config.UPLOAD_DIR, filename)

		fs.writeFile(filepath, calendar.toString(), function(err) {
			if(err) return console.log(err);
			cb(filename);
		});
	});
}


function getFilename (cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    cb(err, err ? undefined : raw.toString('hex'))
  })
}

