module.exports = AsyncFunctionFactory;

function AsyncFunctionFactory(asyncFunc) {
  this.asyncFunc = asyncFunc;
}

AsyncFunctionFactory.prototype.gen = function gen(instance, propertyName) {
  instance.$propertyPromises.push(this.asyncFunc.go().then(function(val) {
    instance[propertyName] = val;
  }));
}
