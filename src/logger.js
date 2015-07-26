'use strict';
function Logger(opts) {
  this.debug = opts.debug || false;
}

Logger.prototype.log = function() {
  if (!this.debug) {
    return;
  }
  var args = Array.prototype.slice.call(arguments);
  args.unshift(new Date().toString());
  console.log.apply(null, args);
};

module.exports = Logger;
