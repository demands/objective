module.exports = ObjectValue;

var _ = require('lodash');
var Promise = require('bluebird');
var Value = require('./value');
var Instance = require('./instance');

function ObjectValue() {
}

ObjectValue.prototype.resolve = function resolve(outerInstance, outerPropertyName) {
  var instance = new Instance();

  _(this).forOwn(function(value, propertyName) {
    value.resolve(instance, propertyName);
  });

  if (outerInstance) {
    outerInstance[outerPropertyName] = instance;
    outerInstance.$propertyPromises.push(Promise.all(instance.$propertyPromises));
  }
  return instance;
}

ObjectValue.fromObject = function fromObject(definitionObject) {
  var definition = new ObjectValue();

  _(definitionObject).forOwn(function(valueDefinition, path) {
    var components = path.split('.');
    var innerDefinition = definition;

    _(components).each(function(component, index) {
      if (index + 1 === components.length) {
        innerDefinition[component] = new Value(valueDefinition);
      } else if (_.isUndefined(innerDefinition[component])) {
        innerDefinition[component] = new ObjectValue();
      }
      innerDefinition = innerDefinition[component];
    });
  });

  return definition;
}
