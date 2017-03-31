var path = require('path');
var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();

var port = 3000;

var options = {
    key: fs.readFileSync( path.join(__dirname, 'keys/server.key') ),
    cert: fs.readFileSync( path.join(__dirname, 'keys/server.crt') )
};

app.use('/', express.static(path.join(__dirname, 'public')));

var server = https.createServer(options, app).listen(port, function(){
	console.log("Express server listening on port " + port);
});