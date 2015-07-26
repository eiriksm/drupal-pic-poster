'use strict';
var request = require('request');
var async = require('async');
var cam = require('./src/camera');
var trigger = require('./src/trigger');
var config = {
  debug: true
};

function doRequest(b64, callback) {
  var data = {
    image: b64
  };
  request.post({
    method: 'POST',
    json: true,
    url: config.url,
    body: data
  }, callback);
}

function doneCamAndRequest(err, response) {
  if (err) {
    console.log('Error with request:', err);
  }
  else {
    console.log('Sent request, status code:', response.statusCode);
  }
}
trigger(config, function(err) {
  if (err) {
    throw err;
  }
  async.waterfall([
    cam.bind(null),
    doRequest.bind(null)
  ], doneCamAndRequest);
});
