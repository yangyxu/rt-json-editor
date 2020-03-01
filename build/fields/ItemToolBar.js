"use strict";

var React = require('react');

var SVGIcon = require('../SVGIcon');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return React.createElement("div", {
      className: "rt-json-editor-item-toolbar"
    }, this.props.items && this.props.items.map(function (item, index) {
      return React.createElement("span", {
        key: index,
        onClick: item.onClick,
        className: "icon-btn",
        title: item.title || ''
      }, item.icon && React.createElement(SVGIcon, {
        icon: item.icon
      }), item.label);
    }));
  }
});