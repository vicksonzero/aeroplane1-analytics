const express = require('express');
const app = express.Router();
const fs = require('fs');
const eventLogger = require('./eventLogger');
const bodyParser = require('body-parser');
const acceptedAPIVersions = ["pre_2.8", "pre_2.9", "pre_2.10"];

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));

// middleware
app.use(function version(req, res, next) {
	var versionString = "";
	if(req.method == "POST") versionString = req.body.v;
	if(req.method == "GET") versionString = req.query.v;
	console.log(req.method + " " + req.baseUrl + req.path + ": " + "ver " + versionString);
	if(versionIsAccepted(versionString)){
		next();
	}else{
		res.status(400).send('{"err":"Unsupported api version: '+ versionString + '"}');
	}
});

const PORT = 3000;

// app.listen(PORT, function () {
// 	console.log('Listening on port '+PORT);
// });

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/newPlayer', function (req, res) {
	// req: username
	var name = eventLogger.addPlayer();
	eventLogger.addRecord("newPlayer", name);
	res.send(name);
});


app.post('/openApp', function (req, res) {
	eventLogger.addRecord("openApp", req.body.username);
});

app.post('/closeApp', function (req, res) {

	eventLogger.addRecord("closeApp", req.body.username);
});

app.post('/gameStart', function (req, res) {
	eventLogger.addRecord("gameStart", req.body.username);
});

app.post('/gameEnd', function (req, res) {

	eventLogger.addRecord("gameEnd", req.body.username);
});

function versionIsAccepted(ver) {
	return (acceptedAPIVersions.indexOf(ver) != -1);
}

module.exports = app;
