var calendar = require('./calendar');


var cal = calendar('./calendar.ics');
console.log(cal.toString());