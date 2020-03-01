var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			
		};
	},
	getInitialState: function () {
		return {
			_key: this.props._key,
			value: this.props.value,
			editing: false
		};
	},
	render:function(){
		return (
			<div className="rt-json-editor-form rt-json-editor-form-hidden">
				
			</div>
		);
	}
});
