var React = require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			
		};
	},
	render:function(){
		return (
			<div className="rt-json-editor-form rt-json-editor-form-function">
				<div className="field-warp">
					<div className="type-tag"></div>
					<div className="key">{this.props.name}</div>
					<div className="value">
						
					</div>
				</div>
			</div>
		);
	}
});
