var React = require('react');
var SVGIcon = require('../SVGIcon');
module.exports = React.createClass({
	render:function(){
		return (
			<div className="rt-json-editor-item-toolbar">
				{
					this.props.items && this.props.items.map(function (item, index){
						return <span key={index} onClick={item.onClick} className="icon-btn" title={item.title||''}>
							{item.icon && <SVGIcon icon={item.icon} />}
							{item.label}
						</span>;
					})
				}
			</div>
		);
	}
});
