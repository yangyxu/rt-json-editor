"use strict";

require('./function.less');

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement("div", {
      className: "rt-json-editor-field rt-json-editor-field-function"
    }, React.createElement("div", {
      className: "field-warp"
    }, React.createElement("div", {
      className: "type-tag"
    }), React.createElement("div", {
      className: "key"
    }, this.props.name), React.createElement("div", {
      className: "value"
    })));
  }
});