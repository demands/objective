module.exports = Instance;

var Promise = require('bluebird');

function Instance() {
  var self = this;

  Object.defineProperty(this, '$propertyPromises', {
    configurable: false,
    enumerable: false,
    value: [],
    writable: false
  });

  Object.defineProperty(this, '$promise', {
    configurable: false,
    enumerable: false,
    get: function() {
      return Promise.all(self.$propertyPromises).then(function() {
        return self;
      });
    }
  });
}
