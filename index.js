var ObjectFactory = require('./lib/factories/object_factory');
var AsyncDefinitionFunction = require('./lib/async_definition_function');

module.exports.def = ObjectFactory.prototype.def;
module.exports.async = function async(fn) {
  return new AsyncDefinitionFunction(fn);
};
