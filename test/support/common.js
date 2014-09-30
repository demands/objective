var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

GLOBAL.expect = chai.expect;
GLOBAL.given = function given(description, func) {
  describe('given ' + description, func);
};
