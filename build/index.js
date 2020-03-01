"use strict";

var React = require('react');

var createClass = require('create-react-class');

if (React && createClass && !React.createClass) {
  React.createClass = createClass;
}

module.exports = {
  field: require('./fields/index.js'),
  form: require('./form/index.js')
};