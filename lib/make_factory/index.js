module.exports = makeFactory

var _ = require('lodash');
var AsyncDefinitionFunction = require('../async_definition_function');

var AsyncFunctionFactory = require('../factories/async_function_factory');
var SyncFunctionFactory = require('../factories/sync_function_factory');
var ObjectFactory = require('../factories/object_factory');
var ValueFactory = require('../factories/value_factory');

function makeFactory(valueDefinition) {
  if (valueDefinition instanceof AsyncDefinitionFunction) {
    return new AsyncFunctionFactory(valueDefinition);
  }

  if (_(valueDefinition).isFunction()) {
    return new SyncFunctionFactory(valueDefinition);
  }

  if (_(valueDefinition).isObject()) {
    return new ObjectFactory(valueDefinition);
  }

  return new ValueFactory(valueDefinition);
}
