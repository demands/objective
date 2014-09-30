var Promise = require('bluebird');

describe('FunctionFactory', function() {
  var FunctionFactory = require('./index');

  describe('::gen', function() {
    describe('given a function that returns a non-promise', function() {
      var factory = new FunctionFactory(function() { return 42; });

      it('assigns the value to the supplied instance / property name', function() {
        var instance = {};
        factory.gen(instance, 'meaningOfLife');
        expect(instance).to.have.property('meaningOfLife', 42);
      });
    });

    describe('given a function that returns a promise', function() {
      var resolve;
      var factory = new FunctionFactory(function() {
        return new Promise(function(_resolve_) {
          resolve = _resolve_;
        });
      });

      it('assigns the value to the supplied instance / property name after the promise resolves', function() {
        var promises = [];
        var instance = { $propertyPromises: promises };
        factory.gen(instance, 'name');
        resolve('zalgo');
        return expect(promises[0]).to.be.fulfilled.then(function() {
          expect(instance).to.have.property('name', 'zalgo');
        });
      });
    });
  });
});
