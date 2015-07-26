'use strict';
var spawn = require('child_process').spawn;
var tesselArgs = [
  'run',
  'tessel/tessel.js'
];
var Logger = require('./logger');

module.exports = function(config, callback) {
  var tesselLogger = new Logger(config);
  var logger = tesselLogger.log.bind(tesselLogger);
  var t = spawn('tessel', tesselArgs);
  t.stdout.on('data', function(d) {
    var s = d.toString('utf8');
    if (s.indexOf('TRIGGER') > -1) {
      callback();
    }
    else {
      logger(s);
    }
  });
  t.stderr.on('data', function(d) {
    logger(d.toString('utf8'));
  });
  t.on('exit', function(c) {
    if (c !== 0) {
      callback(new Error('Tessel process exited with non-zero status code (' + c + ')'));
    }
  });
};
