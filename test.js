var analyser = require('./analyser');



var file = './calendar.ics';

var a = new analyser(file);

console.log(a.toString());