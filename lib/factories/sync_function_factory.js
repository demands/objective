module.exports = SyncFunctionFactory;

function SyncFunctionFactory(func) {
  this.func = func;
}

SyncFunctionFactory.prototype.gen = function gen(instance, propertyName) {
  instance[propertyName] = this.func();
}
