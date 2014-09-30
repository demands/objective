describe('makeFactory', function () {
  var makeFactory = require('./index');

  describe('given a function', function() {
    var FunctionFactory = require('../factories/function_factory');

    it('creates a FunctionFactory', function() {
      var factory = makeFactory(function() {});
      expect(factory).to.be.an.instanceOf(FunctionFactory);
    });
  });

  describe('given an object', function() {
    var ObjectFactory = require('../factories/object_factory');

    it('creates an ObjectFactory', function() {
      var factory = makeFactory({});
      expect(factory).to.be.an.instanceOf(ObjectFactory);
    });
  });

  describe('given a basic value', function() {
    var ValueFactory = require('../factories/value_factory');

    it('creates a ValueFactory', function() {
      var factory = makeFactory(7);
      expect(factory).to.be.an.instanceOf(ValueFactory);
    });
  });
});
