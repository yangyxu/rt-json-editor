"use strict";

require('./ItemToolBar.less');

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return React.createElement("div", {
      className: "rt-json-editor-item-toolbar"
    }, this.props.items && this.props.items.map(function (item, index) {
      return React.createElement("span", {
        onClick: item.onClick,
        className: "icon-btn",
        title: item.title || ''
      }, item.icon && React.createElement("i", {
        className: "fa " + item.icon
      }), item.label);
    }));
  }
});