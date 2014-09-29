var Promise = require('bluebird');

module.exports = function AsyncDefinitionFunction(fn) {
  this.go = Promise.promisify(fn);
}
