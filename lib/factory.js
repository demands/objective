module.exports = Factory;

var _ = require('lodash');
var ObjectValue = require('./object_value');

function Factory(definition) {
  this.definition = definition;
}

Factory.prototype.def = function def(definitionObject) {
  var definition = ObjectValue.fromObject(definitionObject);
  return new Factory(definition);
};

Factory.prototype.gen = function gen(callback) {
  var instance = this.definition.resolve();
  if (_(callback).isFunction()) {
    return instance.$promise.nodeify(callback)
  } else {
    return instance;
  }
};
