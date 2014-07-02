var o = require('objective');

var mongoose = require('mongoose');
var faker = require('faker');
var moment = require('moment');

var Order = require('./models/order');
var Stop = require('./models/stop');
var Route = require('./models/route');

var mongooseFactory = o.object
  .has('_id', function() {
      if (mongoose) {
        return new mongoose.Type.ObjectId();
      } else {
        return Math.random();
      }
    })
  .option('foodhub', 'sfbay')
  .persist(function(instance, factory, done) {
      instance.save(done);
    })
  .foreignKey('_id');

var fulfillmentFactory = mongooseFactory;

var orderFactory = mongooseFactory
  .type(Order)
  .has('customer.name', faker.name)
  .has('customer.phone', faker.phone)
  .has('customer.previousOrders', 5)
  .has('fulfilmentId', function(factory) {
      var name = factory.get('customer.name').split(' ');
      return o.ref(fulfillmentFactory)
        .has('user.firstName', name[0])
        .has('user.lastName', name[1])
        .has('user.phone', factory.get('customer.phone'));
    })
  .has('gift', false)
  .has('deliveryInstructions', 'Leave it behind the front gate')
  .has('leaveDelivery', true)
  .has('active', true)
  .has('number', 1)
  .has('status', 'undelivered');

var stopFactory = mongooseFactory.type(Stop)
  .has('tzid', function(factory) {
      switch (factory.option('foodhub')) {
        case 'sfbay':
          return 'America/Los_Angeles';
        case 'la':
          return 'America/Los_Angeles';
        case 'nola':
          return 'America/Chicago';
        case 'nyc':
          return 'America/New_York';
      }
    })
  .has('delivery', true)
  .has('startAt', function(factory) {
      return moment('2014-02-03 14:00').tz(factory.get('tzid')).toDate();
    })
  .has('endAt', function(factory) {
      return moment(factory.get('startAt')).add(4, 'hours').toDate();
    })
  .has('location', faker.address)
  .has('viamente', o.object)
  .has('driver', faker.email)
  .has('name', function(factory) {
      return factory.parent.get('location.name');
    })
  .has('address', faker.address)
  .has('scheduledTime', function(factory) {
      return moment(factory.parent.get('startAt')).add(15, 'minutes').toDate();
    })
  .has('serviceTime', 300)
  .has('orders', function(factory) {
      if (factory.get('delivery')) {
        return o.array(o.ref(orderFactory))
          .has('customer.name', factory.get('location.name'))
          .length(1);
      } else {
        return o.array(o.ref(orderFactory))
          .has('number', function(factory) {
            return factory.index + 1;
          });
      }
    });

var routeFactory = mongooseFactory
  .type(Route)
  .has('stops', o.array(o.ref(stopFactory)).length(10))
  .has('foodhub', function(factory) {
      return factory.option('foodhub');
    });

routeFactory
  .has('stops[length]', 3)
  .has('stops[0].startAt', moment('2014-06-01 12:30').toDate())
  .has('stops[*].viamente.driver', 'me@maxedmands.com')
  .populate('stops.orders.fulfillments')
  .create(function(route) {
      return console.log(route);
    });
