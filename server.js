var express = require('express');
var routes = require('./app/routes');

// Modules for view rendering
var helpers 	= require('express-helpers')
var ejs 		= require('ejs');
var engine 		= require('ejs-mate');

// Config of the server
var PORT = process.env.PORT || 3143;


// Create express instance, the base of the server.
var app = express();


app.set('view engine', 'ejs');
app.set("view options", {layout: false});
app.set('views', __dirname + '/views');
app.engine('ejs', engine);


routes(app);

app.listen(PORT);

console.log('Server is running : http://localhost:'+PORT);