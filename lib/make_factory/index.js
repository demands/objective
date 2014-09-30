module.exports = makeFactory

var _ = require('lodash');

var FunctionFactory = require('../factories/function_factory');
var ObjectFactory = require('../factories/object_factory');
var ValueFactory = require('../factories/value_factory');

function makeFactory(valueDefinition) {
  if (_(valueDefinition).isFunction()) {
    return new FunctionFactory(valueDefinition);
  }

  if (_(valueDefinition).isObject()) {
    return new ObjectFactory(valueDefinition);
  }

  return new ValueFactory(valueDefinition);
}
