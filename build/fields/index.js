"use strict";

require('./Field.less');

module.exports = {
  array: require('./array.js'),
  "function": require('./function.js'),
  object: require('./object.js'),
  hidden: require('./hidden.js'),
  string: require('./string.boolean.date.number.js'),
  "boolean": require('./string.boolean.date.number.js'),
  date: require('./string.boolean.date.number.js'),
  number: require('./string.boolean.date.number.js')
};