var expect = require('chai').expect;
var o = require('..');

describe('def and gen', function() {
  var factory;

  beforeEach(function() {
    factory = o.def({
      simpleProperty: 1,
      logicProperty: function() { return 2; },
      asyncProperty: o.async(function(cb) { cb(null, 'hello') }),
      'nested.property': 'world'
    });
  });

  describe('promise/synchronous style', function() {
    var instance;

    beforeEach(function() {
      instance = factory.gen()
    });

    it('should have simple properties', function() {
      expect(instance).to.have.property('simpleProperty', 1);
    });

    it('should have properties defined by a function', function() {
      expect(instance).to.have.property('logicProperty', 2);
    });

    it('should not have asynchronous properties until the promise resolves', function() {
      expect(instance).to.not.have.property('asyncProperty');
      instance.$promise.then(function(promiseInstance) {
        expect(instance).to.have.property('asyncProperty', 'hello');
        expect(promiseInstance).to.have.property('asyncProperty', 'hello');
      });
    });

    it('should have nested properties', function() {
      expect(instance.nested).to.have.property('property', 'world');
    });
  });

  describe('async style', function() {
    var instance;

    beforeEach(function(done) {
      factory.gen(function(err, _instance_) {
        instance = _instance_;
        done();
      });
    });

    it('should have simple properties', function() {
      expect(instance).to.have.property('simpleProperty', 1);
    });

    it('should have properties defined by a function', function() {
      expect(instance).to.have.property('logicProperty', 2);
    });

    it('should have asynchronous properties', function() {
      expect(instance).to.have.property('asyncProperty', 'hello');
    });

    it('should have nested properties', function() {
      expect(instance.nested).to.have.property('property', 'world');
    });
  });

});
