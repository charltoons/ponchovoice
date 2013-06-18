//PONCHO VOICE

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , config = require('./config.json')
  , twilio = require('twilio')

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

//Init the weather var
var todaysWeather = "I'm waiting for the weather to be set. Get Poncho to text me.";

//Sets the weather from an incoming text message
app.get('/setWeather', function(req, res){

  //check to see if this is an approved number
  if (config.phoneNumbers.indexOf(req.query.From) != -1) {

    //sets the weather
    todaysWeather = req.query.Body.substring(0, req.query.Body.indexOf('poncho'));

    //send confirmation for testing
    res.send({"error":false, "todaysWeather": todaysWeather});
  }
  else {
    res.send({'error':true, "message":"Hey, that's not cool. Only texts from Twilio please."});
  }
});

//Reads the weather to an incoming caller
app.get('/receiveCall', function(req, res){

  //init response
  var twiml = new twilio.TwimlResponse();

  //construct the response
  twiml.say('Hi there. '+todaysWeather);

  //send back
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
