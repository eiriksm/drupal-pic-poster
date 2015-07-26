'use strict';
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port.B);
ambient.on('ready', function () {
  ambient.setSoundTrigger(0.13);
  ambient.on('sound-trigger', function() {
    console.log('TRIGGER');
    // Clear sound trigger.
    ambient.clearSoundTrigger();
    //After 1.5 seconds reset sound trigger
    setTimeout(function () {
      ambient.setSoundTrigger(0.1);
    }, 1500);
  });
});
ambient.on('error', function (err) {
  throw err;
});
