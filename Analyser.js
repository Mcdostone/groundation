var ical = require('ical');
var moment = require('moment');


module.exports = function(calendar_file) {

    var calendar = ical.parseFile(calendar_file);
    var last = {};

      var format = function(date) {
        return moment(date).format("H:mm");
    }


    return {
        
        toString: function() {
            var desc = '';
            for (var k in calendar) {
                var event = calendar[k];

                var start = moment(event.start);
                var end = moment(event.end);
                //start.add(1, 'h');
                //end.add(1, 'h');

                var location = event.location;
                desc = desc + (format(start) + " - " + format(end) +"\t" + event.summary + "\n");
            }


            return desc;
        }, 

        find: function() {
            for (var k in calendar) {
                var event = calendar[k];

                if(last) {
                    if(moment(event.end).isAfter(moment(last[event.location]))) 
                        last[event.location] = event.end
                }
                else {
                    last[event.location] = event.end   
                }
            }
        },

        compare: function(filename) {
            var student = ical.parseFile(filename);
            for(k in student) {
                var event = student[k];
                var location = event.location

                console.log(last[location]);
                console.log(event.end);

                if(moment(event.end).isSame(moment(last[location]))) {
                    console.log('notify');    
                }
            }
        }
    }




    //return this;
}