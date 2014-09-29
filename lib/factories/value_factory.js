module.exports = ValueFactory;

function ValueFactory(val) {
  this.val = val;
}

ValueFactory.prototype.gen = function gen(instance, propertyName) {
  instance[propertyName] = this.val;
}
