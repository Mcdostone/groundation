var fs = require('fs');
var JSON2Calendar = require('./JSON2Calendar');


fs.readFile('./uploads/tmp', 'utf8', function (err,data) {
  	if (err) return console.log(err);
	JSON2Calendar(JSON.parse(data), function(calendar) {
		JSON2Calendar.writer(calendar, function(filename) {});
	});
});