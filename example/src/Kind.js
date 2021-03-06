require('./Kind.less');
require('../src/index.less');
var React = require('react');
var FIELDS = require('../src/index.js');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			schema: this.props.schema
		};
	},
	__onChange: function (data, child, root){
		var _root = root || child;
		console.log('Changed: ', _root.state.value);
	},
	render: function(){
		var _schema = this.state.schema,
			_Type = FIELDS.object;
		return (
			<div className="json-editor-kind">
				<div className="fields">
					<_Type fold={false} 
						displayClosure={true} 
						displayItemCount={true} 
						label={_schema.kind.value} 
						value={{}} 
						schema={_schema} 
						onChange={this.__onChange} />
				</div>
			</div>
		);
	}
});
