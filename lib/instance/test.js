describe('Instance', function() {
  var Instance = require('./index');

  given('an instance of instance', function() {
    var instance = new Instance();

    describe('.$propertyPromises', function() {
      it('is an array', function() {
        expect(instance.$propertyPromises).to.be.an('array');
      });
    });

    describe('.$promise', function() {
      it('is a Promise that eventually returns itself', function() {
        return expect(instance.$promise).to.eventually.equal(instance)
      });
    });
  });
});
