describe('ValueFactory', function() {
  var ValueFactory = require('./index');

  describe('::gen', function() {
    describe('a factory instance', function() {
      var factory = new ValueFactory('trololo');

      it('assigns the value to the supplied instance / property name', function() {
        var instance = {};
        factory.gen(instance, 'nonLexicalVocable');
        expect(instance).to.have.property('nonLexicalVocable', 'trololo');
      });
    });
  });

});
