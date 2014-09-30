var Promise = require('bluebird')
var ObjectFactory = require('./lib/factories/object_factory');

module.exports.def = ObjectFactory.prototype.def;
module.exports.async = Promise.promisify;
