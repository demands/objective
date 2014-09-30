module.exports = FunctionFactory;

var _ = require('lodash');

function FunctionFactory(func) {
  this.func = func;
}

FunctionFactory.prototype.gen = function gen(instance, propertyName) {
  var output = this.func();
  if (output.then && _(output.then).isFunction()) {
    instance.$propertyPromises.push(output.then(function(val) {
      instance[propertyName] = val;
    }));
  } else {
    instance[propertyName] = output;
  }
}
