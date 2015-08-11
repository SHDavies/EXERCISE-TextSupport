var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Firebase = require('firebase');
var twilio = require('twilio');
var accountSid = '';
var authToken = '';
var client = twilio(accountSid, authToken);
var numRef = new Firebase('https://text-support-devmtn.firebaseio.com/numbers');


////////////////////Middleware////////////////////
app.use(express.static('./public'));
app.use(bodyParser.json());

app.post('/support/messages', function(req, res) {
	client.messages.create({
		to: req.body.to,
		from: '+',
		body: req.body.message
	}, function(err, message) {
		console.log(message.sid);
	});
	var timestamp = new Date().toString();
	numRef.push({
		body: req.body.message,
		date_sent: timestamp,
		from: '+'
	})
	res.end();
})

app.get('/support/resources/:resource_name', function(req, res) {
	var fileName = req.params.resource_name;
	res.sendFile(fileName, {root: './public'});
})

app.listen(8887);