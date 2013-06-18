Poncho Voice
============

This is a simple node server that will read off the weather set by [poncho.is](http://poncho.is). You have to use your own [Twilio](http://twilio.com) number and API Key, though. I ain't made a' money.

Installation:

1.  Setup a Twilio account
2.  Setup a Poncho.is account
3.  Select "text message" or "email and text" in the final step, and type in your Twilio phone number
4.  `git clone http://github.com/charltoons/ponchovoice.git`
5.  `cd ponchovoice`
6.  `cp configSample.json config.json` Copy the sample config.json
7.  Fill out all your info in there
8.  `npm install`
9.  `node app`
10.  Wait till the mornin' (When poncho sends their messages)
11.  Call your Twilio number
12.  Bask in IVR glory
