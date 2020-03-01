"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement("div", {
      className: "rt-json-editor-form rt-json-editor-form-function"
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