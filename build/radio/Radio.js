"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      data: []
    };
  },
  getInitialState: function getInitialState() {
    return {};
  },
  __onItemClick: function __onItemClick(item, index) {
    this.setState({
      value: item.value
    });
    this.props.onChange && this.props.onChange(item, index);
  },
  render: function render() {
    return React.createElement("div", {
      className: "rt-json-editor-radio " + this.props.className,
      style: this.props.style
    }, this.props.data.map(function (item, index) {
      var _this = this;

      return React.createElement("div", {
        onClick: function onClick() {
          return _this.__onItemClick(item, index);
        },
        className: "radio-item " + (this.state.value == item.value ? 'actived' : '')
      }, React.createElement("span", {
        className: "item-tag"
      }), React.createElement("span", {
        className: "item-label"
      }, item.label));
    }.bind(this)));
  }
});