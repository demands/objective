module.exports = ObjectFactory;

var _ = require('lodash');
var Promise = require('bluebird');
var Factory = require('./factory');
var Instance = require('../instance');

function ObjectFactory() {
}

ObjectFactory.prototype.gen = function gen(outerInstance, outerPropertyName) {
  var instance = new Instance();
  var callback = _(arguments).last()

  _(this).forOwn(function(value, propertyName) {
    value.gen(instance, propertyName);
  });

  if (outerInstance instanceof Instance) {
    outerInstance[outerPropertyName] = instance;
    outerInstance.$propertyPromises.push(Promise.all(instance.$propertyPromises));
  }

  if (_(callback).isFunction()) {
    instance.$promise.nodeify(callback);
  }

  return instance;
}

ObjectFactory.prototype.def = function def(definitionObject) {
  var definition = new ObjectFactory();

  _(definitionObject).forOwn(function(valueDefinition, path) {
    var components = path.split('.');
    var innerDefinition = definition;

    _(components).each(function(component, index) {
      if (index + 1 === components.length) {
        innerDefinition[component] = new Factory(valueDefinition);
      } else if (_.isUndefined(innerDefinition[component])) {
        innerDefinition[component] = new ObjectFactory();
      }
      innerDefinition = innerDefinition[component];
    });
  });

  return definition;
}
