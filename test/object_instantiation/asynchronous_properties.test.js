var o = require('../..');

describe('factories with asynchronous properties', function() {
  beforeEach(function() {
    this.factory = o.def({
      property1: o.async(function(cb) { cb(null, 'hello') }),
      property2: o.async(function(cb) { cb(null, 'goodbye') })
    });
  });

  describe('promise/synchronous style', function() {
    beforeEach(function() {
      this.instance = this.factory.gen()
    });

    it('should not have asynchronous properties before the promise resolves', function() {
      expect(this.instance).to.not.have.property('property1');
      expect(this.instance).to.not.have.property('property2');
    });

    it('should populate the original object with the properties after the promise resolves', function() {
      var instance = this.instance;
      instance.$promise.then(function() {
        expect(instance).to.have.property('property1', 'hello');
        expect(instance).to.have.property('property2', 'goodbye');
      });
    });

    it('should return an object with the properties in the promise callback', function() {
      this.instance.$promise.then(function(promiseInstance) {
        expect(promiseInstance).to.have.property('property1', 'hello');
        expect(promiseInstance).to.have.property('property2', 'goodbye');
      });
    });

  });

  describe('async style', function() {
    beforeEach(function(done) {
      this.factory.gen(function(err, instance) {
        this.instance = instance;
        done();
      }.bind(this));
    });

    it('should have asynchronous properties', function() {
      expect(this.instance).to.have.property('property1', 'hello');
      expect(this.instance).to.have.property('property2', 'goodbye');
    });

  });

});
