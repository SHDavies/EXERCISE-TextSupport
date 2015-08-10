var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Firebase = require('firebase');
var twilio = require('twilio');
var accountSid = 'AC93d3411b075769d64133cc100cfddded';
var authToken = '30c8aba504e78b55993363c9eada11db';
var client = twilio(accountSid, authToken);
var numRef = new Firebase('https://text-support-devmtn.firebaseio.com/numbers');


////////////////////Middleware////////////////////
app.use(express.static('./public'));
app.use(bodyParser.json());

app.post('/support/messages', function(req, res) {
	client.messages.create({
		to: req.body.to,
		from: '+13852194564',
		body: req.body.message
	}, function(err, message) {
		console.log(message.sid);
	});
	var timestamp = new Date().toString();
	numRef.push({
		body: req.body.message,
		date_sent: timestamp,
		from: '+13852194564'
	})
	res.end();
})


app.listen(8887);