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

			//console.log(event);

			var start = event.start;

			//console.log(start.getDate());

			var end = event.end;
			var location = event.location;
			var desc = format(start) + " - " + format(end) +"\t" + event.summary;
			console.log(desc);
		}
    }


    var format = function(date) {
    	return formatDate(date, { template: '<%= hh %>:<%= mm %>' });
    }

    return this;
};