var icalendar = require('icalendar');
var config = require('./config/server');
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');

module.exports = function(json, cb) {

	var ical = new icalendar.iCalendar();

	for(i in json) {
		var tmp  = json[i];

		var event = new icalendar.VEvent(i);
		event.setSummary(tmp.title);

		event.setDate(new Date(tmp.startDate), new Date(tmp.endDate));
		event.setLocation(tmp.location);

		ical.addComponent(event);
	}

//	ical.validate();

	cb(ical);
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

