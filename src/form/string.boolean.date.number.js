require('./string.boolean.date.number.less');
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
			values: this.props.values || [],
			editing: this.props.editing || false
		};
	},
	componentDidMount: function (){
		if(Object.prototype.toString.call(this.state.values) == '[object Object]') {
			this.props.valuesHandler && this.props.valuesHandler(this.state.values, this);
		}
	},
	__parseDataType: function (value){
		switch(this.props.type){
			case "object":
			case "array":
				return JSON.parse(value);
			case "function":
				return eval(value);
			case "number":
				return (new Number(value)).valueOf();
			case "boolean":
				return (new Boolean(+value)).valueOf();
			case "date":
				return (new Date(value)).toLocaleDateString();
			default: 
				return value;
		}
	},
	__onUpdate: function(){
		var _prevKey = this.state._key,
			_prevValue = this.state.value,
			_key = _prevKey,
			_value = _prevValue;
		if(this._keydom){
			_key = this._keydom.value;
		}
		if(this._valuedom){
			_value = this.__parseDataType(this._valuedom.value);
		}

		this.setState({
			_key: _key,
			value: _value,
			editing: false
		});
		
		this.props.onChange && this.props.onChange({
			prevKey: _prevKey,
			prevValue: _prevValue,
			key: _key,
			value: _value
		}, this, this.props.parent);
	},
	__onRemove: function (){
		this.props.onRemove && this.props.onRemove(this.state._key, this);
	},
	__renderValue: function (){
		switch(this.props.type){
			case "string":
				if(this.props.pre || this.props.textarea){
					return <pre className="field-value">"{this.state.value}"</pre>;
				}
				return <span className="field-value">"{this.state.value}"</span>;
			case "boolean":
				return <span className="field-value">{this.state.value.toString()}</span>;
			case "date":
				return <span className="field-value">"{this.state.value}"</span>;
			case "number":
				return <span className="field-value">{this.state.value}</span>;
		}
	},
	__onInputKeyUp: function (event){
		if(event.keyCode==13){
			this.__doInputChange(event);
		}
	},
	__onKeyInputBlur: function (){
		this.__doKeyInputChange(event);
	},
	__onKeyInputKeyUp: function (event){
		if(event.keyCode==13){
			this.__doKeyInputChange(event);
		}
	},
	__doKeyInputChange: function (event){
		var _key = event.target.value;
		var _prevKey = this.state._key;
		this.setState({
			_key: _key,
			editing: false
		});
		
		this.props.onChange && this.props.onChange({
			prevKey: _prevKey,
			key: _key,
			value: this.state.value
		}, this, this.props.parent);
	},
	__onInputBlur: function (){
		this.__doInputChange(event);
	},
	__doInputChange: function (event){
		var _value = this.__parseDataType(event.target.value);
	
		this.setState({
			value: _value,
			editing: false
		});
		this.props.onChange && this.props.onChange({
			key: this.state._key,
			prevValue: this.state.value,
			value: _value
		}, this, this.props.parent);
	},
	__renderInput: function (){
		if(this.props.type == "boolean") {
			return <select onChange={this.__doInputChange} ref={(dom)=>this._valuedom = dom} required value={this.state.value}>
				{
					[
						{ label: 'True', value: true },
						{ label: 'False', value: false }
					].map(function (item, index){
						return <option key={index} value={+item.value}>{item.label}</option>;
					})
				}
			</select>;
		}
		if(this.state.values){
			return <select onChange={this.__doInputChange} ref={(dom)=>this._valuedom = dom} required value={this.state.value}>
				{
					this.state.values.map(function (item, index){
						return <option key={index} value={item}>{item}</option>;
					})
				}
			</select>;
		}
		var _type = this.props.type || 'text';
		if(_type=='string'){
			_type = 'text';
		}
		if(this.props.pre || this.props.textarea){
			return <textarea onBlur={this.__onInputBlur} ref={(dom)=>this._valuedom = dom} defaultValue={this.state.value} className="input" name="value"  />
		}

		return <input onBlur={this.__onInputBlur} onKeyUp={this.__onInputKeyUp} ref={(dom)=>this._valuedom = dom} defaultValue={this.state.value} className="input" name="value" type={_type} />;
	},
	__renderEditableKey: function (){
		if(this.state._key){
			return (!!this.props.required || !this.props.keyEditable) ? <span className="field-key">
				{this.props.label || this.state._key}
			</span> : <input onBlur={this.__onKeyInputBlur} onKeyUp={this.__onKeyInputKeyUp} ref={(dom)=>this._keydom = dom} className="input" defaultValue={this.state._key} name="_key" type="text" />;
		}
	},
	__renderDesc: function (){
		if(this.props.desc){
			return <div className="field-desc"><i className="fa fa-info-circle" />{this.props.desc}</div>;
		}
	},
	setValues: function (values){
		this.setState({
			values: values
		});
	},
	validate: function (){
		if(this.props.required){
			switch(this.props.type){
				case 'string':
				case 'date':
					if(this.state.value){
						return true;
					}else{
						return false;
					}
				case 'boolean':
				case 'number':
					if(this.state.value !== undefined && this.state.value !== null){
						return true;
					}else{
						return false;
					}
			}
		}
	},
	render:function(){
		var _toolbars = [];
		if(this.props.editable !== false){
			_toolbars.push({ icon: 'fa-edit', onClick: ()=>this.setState({ editing: true }) });
		}
		if(this.props.removal && !this.props.required) {
			_toolbars.push({ icon: 'fa-trash', onClick: this.__onRemove });
		}
		
		return (
			<div className={"rt-json-editor-form rt-json-editor-form-string" + (this.props.required?' required':'') + (this.props.hidden?' hidden':'') + ' ' + (this.props.className||'')} style={this.props.style}>
				{
					!!this.state.editing ? <div className="field-warp string-editing editing-mode">
						<div className="meta-data">
							{this.__renderEditableKey()}
							{
								this.state._key && <span className="field-colon">:</span>
							}
							{
								this.__renderInput()
							}
							<span className="editing-btns">
								<i onClick={this.__onUpdate} title="CONFIRM" className="icon-btn far fa-check-circle" />
								<i onClick={()=>this.setState({ editing: false })} title="CANCEL" className="icon-btn far fa-times-circle" />
							</span>
						</div>
					</div> : <div className={"field-warp " + (this.props.type + "-warp")}>
						<div className="meta-data">
							{
								this.state._key && <span title={this.props.title} className="field-key">{this.props.label||this.state._key}</span>
							}
							{
								this.state._key && <span className="field-colon">:</span>
							}
							{this.__renderValue()}
							<ItemToolBar items={_toolbars} />
						</div>
					</div>
				}
				{this.__renderDesc()}
			</div>
		);
	}
});
