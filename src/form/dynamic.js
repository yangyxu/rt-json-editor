require('./dynamic.less');
var React = require('react');
var ItemToolBar = require('./ItemToolBar.js');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			removal: true
		};
	},
	getInitialState: function () {
		return {
			_key: this.props._key,
			value: this.props.value,
			valueSchema: this.__matchItem(this.props.keys, this.props._key)
		};
	},
	__matchItem: function (data, key){
		for(var i = 0, _len = data.length; i < _len; i++){
			if(data[i].key == key){
				return data[i];
			}
		}
	},
	__renderEditableKey: function (){
		return <select className="editable-key" onChange={this.__doKeyChange} required defaultValue={this.state._key}>
			{
				this.props.keys.map(function (item, index){
					return <option key={index} value={item.key}>{item.key}</option>;
				})
			}
		</select>;
	},
	__doKeyChange: function(event){
		var _key = event.target.value,
			_schema = this.__matchItem(this.props.keys, _key),
			_value = this.props.parent.__getSchemaInitialValue(_schema);
		this.props.parent.state.value[this.state._key] = null;
		delete this.props.parent.state.value[this.state._key];
		this.props.parent.state.value[_key] = _value;
		this.setState({
			_key: _key,
			value: _value,
			valueSchema: _schema
		});
	},
	__renderInput: function (){
		if(this.state.valueSchema){
			var types = require('./index');
			var _Type = types[this.state.valueSchema.type];
			if(_Type) {
				return <_Type {...this.props} {...this.state.valueSchema} _key={this.state._key} value={this.state.value} />;
			}
		}
	},
	__renderDesc: function (){
		if(this.props.desc){
			return <div className="field-desc"><i className="fa fa-info-circle" />{this.props.desc}</div>;
		}
	},
	__onRemove: function (){
		this.props.onRemove && this.props.onRemove(this.state._key, this);
	},
	render:function(){
		var _toolbars = [];
		if(this.props.removal && !this.props.required) {
			_toolbars.push({ icon: 'fa-trash', onClick: this.__onRemove });
		}
		
		return (
			<div className={"rt-json-editor-form rt-json-editor-form-dynamic" + (this.props.required?' required':'') + (this.props.hidden?' hidden':'') + ' ' + (this.props.className||'')} style={this.props.style}>
				<div className="field-warp dynamic-editing">
					<div className="dynamic-meta meta-data">
						{this.__renderEditableKey()}
						<ItemToolBar items={_toolbars} />
					</div>
					<div className="dynamic-input">
						{
							this.__renderInput()
						}
					</div>
				</div>
				{this.__renderDesc()}
			</div>
		);
	}
});
