var Factory = require('./lib/factory');
var AsyncDefinitionFunction = require('./lib/async_definition_function');

module.exports.def = Factory.prototype.def;
module.exports.async = function async(fn) {
  return new AsyncDefinitionFunction(fn);
};
