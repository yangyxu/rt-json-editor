require('./comment.less');
var React = require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data
		};
	},
	render: function(){
		return (
			<div className="rt-json-editor-field rt-json-editor-field-array">
				<textarea className="input" value={this.state.data} 
					onChange={(event)=>this.setState({ data: event.target.value })} />
			</div>
		);
	}
});
