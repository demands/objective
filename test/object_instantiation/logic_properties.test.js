var o = require('../..');

describe('factories with logic properties', function() {
  beforeEach(function() {
    function counter() {
      var count = 0;
      return function() {
        return count++;
      };
    }
    this.factory = o.def({
      property1: counter(),
      property2: counter()
    });
  });

  it('calls the logic properties during each instantiation', function() {
    var instance1 = this.factory.gen();
    expect(instance1).to.have.property('property1', 0);
    expect(instance1).to.have.property('property2', 0);

    var instance2 = this.factory.gen();
    expect(instance2).to.have.property('property1', 1);
    expect(instance2).to.have.property('property2', 1);
  });

});
