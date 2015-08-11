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

app.get('/support/resources/:resource_name', function(req, res) {
	console.log("resource");
	switch(req.params.resource_name) {
    case "terms-and-conditions":
      res.sendFile('FakeTermsandConditions.pdf', {root: './public'});
    break;
    case "cease-and-desist":
      res.sendFile('./public/FakeCeaseandDesist.pdf', {root: './public'});
    break;
    case "helpful-infographic":
      res.sendFile('./public/helpful-infographic.jpg', {root: './public'});
    break;
    default:
      res.sendFile('./public/404.html', {root: './public'});
    break;
  }
})

app.listen(8887);