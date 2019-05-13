require('./ItemToolBar.less');
var React = require('react');
module.exports = React.createClass({
	render:function(){
		return (
			<div className="rt-json-editor-item-toolbar">
				{
					this.props.items && this.props.items.map(function (item, index){
						return <span onClick={item.onClick} className="icon-btn" title={item.title||''}>
							{item.icon && <i className={"fa " + item.icon} />}
							{item.label}
						</span>;
					})
				}
			</div>
		);
	}
});
