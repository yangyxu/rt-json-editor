require('./string.boolean.date.number.less');
var React = require('react');
var ItemToolBar = require('./ItemToolBar.js');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			_key: this.props._key,
			value: this.props.value,
			editing: false
		};
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
			_value = this._valuedom.value;
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
		}, this);
	},
	__onRemove: function (){
		this.props.onRemove && this.props.onRemove(this.state._key, this);
	},
	__renderValue: function (){
		switch(this.props.type){
			case "string":
				return <span className="field-value">"{this.state.value}"</span>;
			case "boolean":
				return <span className="field-value">{this.state.value.toString()}</span>;
			case "date":
				return <span className="field-value">"{this.state.value}"</span>;
			case "number":
				return <span className="field-value">{this.state.value}</span>;
		}
	},
	__renderInput: function (){
		if(this.props.type == "boolean") {
			return <select ref={(dom)=>this._valuedom = dom} required defaultValue={this.state.value}>
				{
					[true, false].map(function (item, index){
						return <option key={index} value={item}>{item.toString()}</option>;
					})
				}
			</select>;
		}
		if(this.props.values){
			return <select ref={(dom)=>this._valuedom = dom} required defaultValue={this.state.value}>
				{
					this.props.values.map(function (item, index){
						return <option key={index} value={item}>{item}</option>;
					})
				}
			</select>;
		}
		return <input ref={(dom)=>this._valuedom = dom} defaultValue={this.state.value} className="input" name="value" type="text" />;
	},
	__renderEditableKey: function (){
		if(this.state._key){
			return !!this.props.required ? <span className="field-key">
				{this.props.label || this.state._key}
			</span> : <input ref={(dom)=>this._keydom = dom} className="input" defaultValue={this.state._key} name="_key" type="text" />;
		}
	},
	render:function(){
		var _toolbars = [];
		if(this.props.editable !== false){
			_toolbars.push({ icon: 'fa-edit', onClick: ()=>this.setState({ editing: true }) });
		}
		if(!this.props.required) {
			_toolbars.push({ icon: 'fa-trash', onClick: this.__onRemove });
		}

		return (
			<div className={"rt-json-editor-field rt-json-editor-field-string " + (this.props.required?'required':'')}>
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
								this.state._key && <span title={this.props.title} className="field-key">{this.state._key}</span>
							}
							{
								this.state._key && <span className="field-colon">:</span>
							}
							{this.__renderValue()}
							<ItemToolBar items={_toolbars} />
						</div>
					</div>
				}
			</div>
		);
	}
});
