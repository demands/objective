var expect = require('chai').expect;

describe('makeFactory', function () {
  var makeFactory = require('./index');

  describe('given an AsyncDefinitionFunction', function () {
    var AsyncDefinitionFunction = require('../async_definition_function');
    var AsyncFunctionFactory = require('../factories/async_function_factory');

    it('creates an AsyncFunctionFactory', function() {
      var factory = makeFactory(new AsyncDefinitionFunction(function() {}));
      expect(factory).to.be.an.instanceOf(AsyncFunctionFactory);
    });
  });

  describe('given a regular function', function() {
    var SyncFunctionFactory = require('../factories/sync_function_factory');

    it('creates a SyncFunctionFactory', function() {
      var factory = makeFactory(function() {});
      expect(factory).to.be.an.instanceOf(SyncFunctionFactory);
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
