require('./JSONEditor.less');
var React = require('react');
React.createClass = require('create-react-class');
var Kind = require('./Kind.js');
var schema = require('./schema/index.js');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			kinds: this.props.kinds || []
		};
	},
	__getKindInitSchemaByJSONPath: function (target, kind){
		var _target = target || schema;
		var _paths = kind.split('')
		var _schema = this.__getSchemaByJSONPath(schema, kind);
	},
	__onCreateKind: function (kind){
		this.state.kinds.push(schema.getSchema(kind));
		this.forceUpdate();
	},
	render: function(){
		return (
			<div className="json-editor">
				<div className="editor-warp">
					<div className="editor-header">
						<div className="title">K8S YAML File Builder</div>
						<ul className="tool-bar btns">
							<li className="btn" onClick={()=>this.__onCreateKind('Deployment')}>Create Kind</li>
						</ul>
					</div>
					<div className="editor-body">
						{
							!!this.state.kinds.length ? <ul className="kinds">
								{
									this.state.kinds.map(function (kind, index){
										return <li key={index} className="kind-warp"><Kind schema={kind} /></li>
									})
								}
							</ul> : <div className="tips">
								<div className="note">You first need to create kind block.</div>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
});
