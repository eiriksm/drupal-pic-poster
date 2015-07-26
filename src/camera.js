'use strict';
var imagesnapjs = require('imagesnapjs');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
// Do something async right away, will never be a race condition anyway.
var imgPath = path.join(__dirname, '..', 'imgs');
mkdirp(imgPath);

function seriesDone(callback, err, results) {
  if (err) {
    callback(err);
  }
  else {
    var file = results[1];
    var b64 = new Buffer(file, 'binary').toString('base64');
    callback(err, b64);
  }
}

module.exports = function(callback) {
  var filename = path.join(imgPath, 'image' + Date.now() + '.jpg');
  async.series([
    imagesnapjs.capture.bind(null, filename),
    fs.readFile.bind(null, filename)
  ], seriesDone.bind(null, callback));
};
