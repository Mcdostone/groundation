var ical = require('ical');
var formatDate = require('simple-format-date');
var moment = require('moment');

module.exports = function(filename) {
    this.data = ical.parseFile(filename);

    this.lastPresenceByRoom = {};


    /**
     * ToString method (overload)
     */
    this.toString = function() {
		for (var k in this.data) {
			var event = this.data[k];

			var start = event.start;
			var end = event.end;
			var location = event.location;
			var desc = format(start) + " - " + format(end) +"\t" + event.summary;
		}

        for (var k in this.lastPresenceByRoom) {
            console.log(k);
        }

    }


    this.findLastPresence = function() {
        for (var k in this.data) {
            var event = this.data[k];
            console.log(event);
            //this.lastPresenceByRoom{event.location} = event.end;
        }
    }


    var format = function(date) {
    	return formatDate(date, { template: '<%= hh %>:<%= mm %>' });
    }

    return this;
};



}