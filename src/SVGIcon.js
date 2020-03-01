var React = require('react');
var ReactFA = require('@fortawesome/react-fontawesome');
var SolidSVGIcons = require('@fortawesome/free-solid-svg-icons');
var BrandsSVGCore = require('@fortawesome/free-brands-svg-icons');
var RegularSVGCore = require('@fortawesome/free-regular-svg-icons');

var SVGIcon = React.createClass({
	displayName:'ZRSVGIcon',
	render: function(){
		var _icon = this.props.icon,
		_icon = SolidSVGIcons.fas[_icon] || BrandsSVGCore.fab[_icon] || RegularSVGCore.fbr[_icon];

		return (
			<ReactFA.FontAwesomeIcon {...this.props} icon={_icon} />
		);
	}
});

module.exports = SVGIcon;
