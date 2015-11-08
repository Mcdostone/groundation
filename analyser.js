var ical = require('ical');
var moment = require('moment');


module.exports = function(calendar_file) {

    this.calendar = ical.parseFile(calendar_file);

    /**
     * ToString method (overload)
     */
    
    /**
     * ToString method (overload)
     */
    this.toString = function() {
    	var desc = '';
		for (var k in this.calendar) {
			var event = this.calendar[k];

			var start = event.start;
			var end = event.end;
			var location = event.location;
			desc = desc + (format(start) + " - " + format(end) +"\t" + event.summary + "\n");
		}
		return desc;
    }



    var format = function(date) {
    	return moment(date).format("H:mm");
    }

    return this;
}