"use strict";

require('./hidden.less');

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {};
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value,
      editing: false
    };
  },
  render: function render() {
    return React.createElement("div", {
      className: "rt-json-editor-form rt-json-editor-form-hidden"
    });
  }
});