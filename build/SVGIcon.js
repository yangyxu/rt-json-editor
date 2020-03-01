"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = require('react');

var ReactFA = require('@fortawesome/react-fontawesome');

var SolidSVGIcons = require('@fortawesome/free-solid-svg-icons');

var BrandsSVGCore = require('@fortawesome/free-brands-svg-icons');

var RegularSVGCore = require('@fortawesome/free-regular-svg-icons');

var SVGIcon = React.createClass({
  displayName: 'ZRSVGIcon',
  render: function render() {
    var _icon = this.props.icon,
        _icon = SolidSVGIcons.fas[_icon] || BrandsSVGCore.fab[_icon] || RegularSVGCore.fbr[_icon];

    return React.createElement(ReactFA.FontAwesomeIcon, _extends({}, this.props, {
      icon: _icon
    }));
  }
});
module.exports = SVGIcon;