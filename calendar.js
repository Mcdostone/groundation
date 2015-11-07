var ical = require('ical');
var formatDate = require('simple-format-date');

module.exports = function(filename) {
    this.data = ical.parseFile(filename);


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
    }


    var format = function(date) {
    	return formatDate(date, { template: '<%= hh %>:<%= mm %>' });
    }

    return this;
};



}