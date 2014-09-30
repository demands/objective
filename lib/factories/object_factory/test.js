var expect = require('chai').expect;

describe('ObjectFactory', function() {
  var ObjectFactory = require('./index');

  describe('::gen', function() {
    var Instance = require('../../instance');

    it('generates an Instance', function() {
      var factory = new ObjectFactory();
      var instance = factory.gen();
      expect(instance).to.be.an.instanceOf(Instance);
    });
  });

  describe('::def', function() {
    it('defines a new ObjectFactory', function() {
      var factory = new ObjectFactory();
      var child = factory.def();
      expect(child).to.be.an.instanceOf(ObjectFactory);
      expect(child).to.not.equal(factory);
    });
  });
});
