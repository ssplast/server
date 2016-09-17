global._ = {};
_.fs = require('fs');
_.os = require('os').type();
_.url = require('url');
_.ejs = require('ejs');
_.path = require('path');
_.rootDir = _.path.join(__dirname, '/..', '/..');
_.libs = _.path.join(_.rootDir,'libs/');
_.template = _.path.join(_.rootDir,'templates/');
_.c = require(_.path.join(_.libs, 'console', 'console.js'));
_.cr = require(_.path.join(_.libs, 'console', 'error.js'));
_.log = require(_.path.join(_.libs, 'log', 'log.js'));

_.arduinoClient = [];

_.host = '192.168.0.100';//'warp.pp.ua';//192.168.0.101;
_.port = '7777';
_.sPort = '8443';
_.ip = require('ip').address();
