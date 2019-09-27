"use strict";

require('./comment.less');

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      data: this.props.data
    };
  },
  render: function render() {
    var _this = this;

    return React.createElement("div", {
      className: "rt-json-editor-field rt-json-editor-field-array"
    }, React.createElement("textarea", {
      className: "input",
      value: this.state.data,
      onChange: function onChange(event) {
        return _this.setState({
          data: event.target.value
        });
      }
    }));
  }
});