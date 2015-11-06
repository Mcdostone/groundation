var express = require('express');
var routes = require('./app/routes');


// Config of the server
var PORT = process.env.PORT || 3143;


// Create express instance, the base of the server.
var app = express();


routes(app);

app.listen(PORT);

console.log('Server is running : http://localhost:'+PORT);