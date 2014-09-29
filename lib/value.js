module.exports = Value;

var _ = require('lodash');
var AsyncDefinitionFunction = require('./async_definition_function');

function Value(val) {
  this.val = val;
}

Value.prototype.resolve = function resolve(instance, propertyName) {
  if (this.val instanceof AsyncDefinitionFunction) {
    instance.$propertyPromises.push(this.val.go().then(function(val) {
      instance[propertyName] = val;
    }));
  } else if (_(this.val).isFunction()) {
    instance[propertyName] = this.val()
  } else {
    instance[propertyName] = this.val;
  }
};
