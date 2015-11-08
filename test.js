var Analyser = require('./Analyser');



var building = './uploads/c7e0c119aeefd7a97d87d5bd060bc660';
var student = './uploads/b69032f2677bd5cc3d79fb495e3c0a14';

var a = new Analyser(building);

console.log("### BUILDING ###\n");
console.log(a.toString());



a.find();

a.compare(student);



/*var b = new Analyser(student);*/
/*console.log("\n### STUDENT ###\n");
console.log(b.toString());



*/