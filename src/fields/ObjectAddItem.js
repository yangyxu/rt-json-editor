require('./ObjectAddItem.less');
require('codemirror/lib/codemirror.css');
require('codemirror/lib/codemirror.js');
require('codemirror/theme/material.css');
require('codemirror/mode/yaml/yaml.js');
require('codemirror/mode/javascript/javascript.js');
var React = require('react');
var Radio = require('../radio/Radio.js');

var CodeMirror = require('react-codemirror2').UnControlled;
//console.log(codemirror2);
//import { UnControlled as CodeMirror } from 'react-codemirror2';

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			_key: '',
			value: null,
			fold: true,
			parent: null,
			displayClosure: true,
			displayItemCount: true
		};
	},
	getInitialState: function () {
		return {
			_key: this.props._key,
			type: this.props.type || 'string',
			value: this.props.value
		};
	},
	__onKeyChange: function (event){
		var _input = event.target;
		this.setState({
			_key: _input.value
		});
	},
	__onSelectChange: function (event){
		var _input = event.target;
		this.setState({
			type: _input.value
		});
	},
	__onInputChange: function (event){
		var _input = event.target;
		this.setState({
			value: _input.value
		});
	},
	__renderValueInput: function (){
		switch(this.state.type){
			case "string":
				return <input value={this.state.value} onChange={(event)=>this.setState({ value: event.target.value })} className="input" name="value" type="text" />;
			case "number":
				return <input value={this.state.value} onChange={(event)=>this.setState({ value: event.target.value })} className="input" name="value" type="number" />;
			case "date":
				return <input value={this.state.value} onChange={(event)=>this.setState({ value: event.target.value })} className="input" name="value" type="date" />;
			case "boolean":
				return <Radio onChange={(data, index)=>this.setState({ value: data.value })} data={[{ label: 'True', value: true }, { label: 'False', value: false }]} style={{width: '100%'}} />;
			case "object":
			case "array":
			case "function":
				return <CodeMirror
                            value={''}
                            options={{
                                mode: 'json',
                                theme: 'material',
                                lineNumbers: true
                            }}
                            onChange={(editor, data, value) => {
								this.state.value = value;
                                this.forceUpdate();
                            }}
                        />;
		}
	},
	__onCreate: function (){
		if(this.state._key != undefined && !this.state._key){
			this._keydom.focus();
			return alert("The Key is required."), false;
		}
		if(!this.state.type) {
			return alert("The Type is required."), false;
		}
		if(!this.state.value) {
			return alert("The Value is required."), false;
		}else{
			switch(this.state.type){
				case "object":
				case "array":
					this.state.value = JSON.parse(this.state.value);
					break;
				case "function":
					this.state.value = eval(this.state.value);
					break;
			}
		}

		this.props.onSubmit && this.props.onSubmit(this.state);
	},
	render: function(){
		return (
			<form className="rt-json-editor-object-add-item">
				{
					(this.state._key != null) && <div className="form-item">
						<span className="label">Key:</span>
						<input ref={(ref)=>this._keydom = ref} defaultValue={this.state._key} onChange={this.__onKeyChange} className="input" name="_key" type="text" />
					</div>
				}
				<div className="form-item">
					<span className="label">Type:</span>
					<select disabled={!!this.props.type} required defaultValue={this.state.value||"string"} className="rt-json-editor-data-type-select" onChange={this.__onSelectChange}>
						{
							[
								'string', 'number', 'boolean', 'date', 'object', 'array', 'function'
							].map(function (item, index){
								return <option key={index} value={item}>{item}</option>;
							})
						}
					</select>
				</div>
				<div className="form-item">
					<span className="label">Value: </span>
					{this.__renderValueInput()}
				</div>
				<div className="form-btns">
					<span onClick={this.__onCreate} className="form-btn submit"><i className="fa fa-plus" />Create</span>
					<span onClick={this.props.onCancel} className="form-btn cancel"><i className="fa fa-trash" />Cancel</span>
				</div>
			</form>
		);
	}
});
