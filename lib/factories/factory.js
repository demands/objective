module.exports = Factory;

var _ = require('lodash');
var AsyncDefinitionFunction = require('../async_definition_function');

function Factory(val) {
  this.val = val;
}

Factory.prototype.gen = function gen(instance, propertyName) {
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
