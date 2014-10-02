var o = require('../..');

describe('factories with simple properties', function() {
  beforeEach(function() {
    this.instance = o.def({
      simpleProperty: 1,
      'deeply.nested.property': 'world',
      'deeply.nested.otherProperty': 'yo'
    }).gen();
  });

  it('should have simple properties', function() {
    expect(this.instance).to.have.property('simpleProperty', 1);
  });

  it('should have nested properties', function() {
    expect(this.instance.deeply.nested).to.have.property('property', 'world');
    expect(this.instance.deeply.nested).to.have.property('otherProperty', 'yo');
  });

});
