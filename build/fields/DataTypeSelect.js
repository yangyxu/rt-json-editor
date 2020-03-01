"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return React.createElement("select", {
      required: true,
      className: "rt-json-editor-data-type-select"
    }, ['string', 'number', 'boolean', 'date', 'object', 'array', 'function'].map(function (item, index) {
      return React.createElement("option", {
        key: index,
        value: item
      }, item);
    }));
  }
});