
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', 6006);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

var config = require('./config.json');
var twilio = require('twilio')(config.twilio.accountSID, config.twilio.authToken);
var todaysWeather = "";

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/setWeather', function(req, res){
  if (req.query.AccountSid == config.twilio.accountSID) {
    todaysWeather = req.query.Body.substring(0, req.query.Body.indexOf('poncho'));
    res.send({"error":false, "todaysWeather": todaysWeather});
  }
  else {
    res.send({'error':true, "message":"Hey, that's not cool. Only texts from Twilio please."});
  }
});
app.get('/receiveCall', function(req, res){
  //Create TwiML response
  var twiml = new twilio.TwimlResponse();
  twiml.say('Hello World!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
