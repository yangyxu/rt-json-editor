var React = require('react');

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			className: '',
			data:[]
		};
	},
	getInitialState: function () {
		return {
			
		};
	},
	__onItemClick: function (item, index){
		this.setState({ value: item.value });
		this.props.onChange && this.props.onChange(item, index);
	},
	render: function(){
		return (
			<div className={"rt-json-editor-radio " + this.props.className} style={this.props.style}>
				{
					this.props.data.map(function (item, index){
						return <div onClick={()=>this.__onItemClick(item, index)} className={"radio-item " + (this.state.value==item.value?'actived':'')}>
							<span className="item-tag"></span>
							<span className="item-label">{item.label}</span>
						</div>;
					}.bind(this))
				}
			</div>
		);
	}
});
