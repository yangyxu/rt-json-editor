require('./array.less');
var React = require('react');
var ItemToolBar = require('./ItemToolBar.js');
var ObjectAddItem = require('./ObjectAddItem.js');

var _array = React.createClass({
	getDefaultProps: function () {
		return {
			value: [],
			schema: {},
			fold: false,
			displayClosure: true,
			displayItemCount: true
		};
	},
	getInitialState: function () {
		return {
			_key: this.props._key,
			value: this.props.value,
			fold: this.props.fold,
			adding: false,
			editing: false
		};
	},
	componentDidMount: function (){
		return;
		var _initial = null;
		if(this.props.initial === true && this.props.schema){
			_initial = this.getValueFromSchema(this.props.schema);
		}
		if(_initial){
			this.state.value.push(_initial);
			this.forceUpdate();
		}
	},
	getValueFromSchema: function (schema){
		var _type = Object.prototype.toString.call(schema).toLowerCase().split(' ')[1].replace(']', ''),
			_value = null;
		if(_type=='array'){
			_value = [];
			schema.forEach(function (temp, index){
				/*
				if(temp.schema){
					_value.push(this.getValueFromSchema(temp.schema));
				}else{
					_value.push(temp.value||null);
				}*/

				_value.push(temp.value||null);
			}.bind(this));
		}else if(_type=='object'){
			_value = {};
			for(var key in schema){
				var _temp = schema[key];
				/*
				if(_temp.schema){
					_value[key] = this.getValueFromSchema(_temp.schema);
				}else{
					_value[key] = _temp.value || null;
				}*/

				_value[key] = _temp.value || null;
			}
		}
		console.log(_value, schema);
		return {};
	},
	__onChildValueInitial: function (key, value, child, index){
		
	},
	__onChildRemove: function (key, child, index){
		if (window.confirm("Do you really want to delete the key?")) { 
			this.state.value.splice(index, 1);
			this.forceUpdate();
			this.props.onChange && this.props.onChange({
				key: key,
				value: undefined
			}, child, this);
		}
	},
	__onChildChange: function (data, child, index){
		if(this == child.props.parent){
			if( data.prevValue != data.value ) {
				this.state.value.splice(index, 1, data.value);
				this.forceUpdate();
			}
		}
		this.props.onChange && this.props.onChange(data, child, this);
	},
	__onRemove: function (){
		this.props.onRemove && this.props.onRemove(this.props._key);
	},
	__onCreateSubmit: function (data){
		this.state.value.push(data.value);
		this.state.adding = false;
		this.forceUpdate();
		this.props.onChange && this.props.onChange(data, this, this);
	},
	__onCreateCancel: function (){
		this.setState({ adding: false });
	},
	__onKeyInputBlur: function (event){
		var _prevKey = this.state._key,
			_key = event.target.value;
		this.setState({ 
			editing: false, 
			_key: _key
		});
		this.props.onChange && this.props.onChange({
			prevKey: _prevKey,
			key: _key,
			value: this.state.value
		}, this, this);
	},
	__renderEditor: function (){
		return <ObjectAddItem type={this.props.dataType} _key={null} onSubmit={this.__onCreateSubmit} onCancel={this.__onCreateCancel} />;
	},
	__onAdd: function (){
		if(this.props.schema){
			//todo : not finished.
			this.state.value.push({});
			this.forceUpdate();
		}else{
			this.setState({ adding: true });
		}
	},
	render: function(){
		var FIELDS = {
			array: _array,
			object: require('./object.js'),
			function: require('./function.js'),
			string: require('./string.boolean.date.number.js'),
			boolean: require('./string.boolean.date.number.js'),
			date: require('./string.boolean.date.number.js'),
			number: require('./string.boolean.date.number.js')
		}
		var _btns = [
			{ icon: 'fa-plus', onClick: this.__onAdd }
		];
		if(this.props._key){
			_btns.unshift({ icon: 'fa-edit', onClick: ()=>this.setState({ editing: true }) });
		}
		if(this.props.parent) {
			_btns.push({ icon: 'fa-trash', onClick: this.__onRemove });
		}
		//console.log(this.state.value);
		return (
			<div className={"rt-json-editor-field rt-json-editor-field-object rt-json-editor-field-array " + (this.state.fold?' fold':' unfold') + (this.props.required?' required':'')}>
				{
					this.state.adding && this.__renderEditor()
				}
				<div className="field-warp object-warp">
					<div className="meta-data">
						<span className="fold-icon" onClick={()=>this.setState({ fold: !this.state.fold })} >
							<i className={"fas " + (this.state.fold?'fa-caret-right':'fa-caret-down')} />
						</span>
						{
							this.state._key && <div className="_key">
								{
									this.state.editing ? <input onBlur={this.__onKeyInputBlur} defaultValue={this.state._key} className="key-input" name="_key" type="text" /> : <span title={this.props.title} className="field-key _key-name">{this.props.label || this.state._key}</span>
								}
								<span className="_key-colon">:</span>
							</div>
						}
						{
							this.props.displayClosure && <span className="closure-start">{'['}</span>
						}
						{
							!!this.state.fold && <span className="dots" onClick={()=>this.setState({ fold: !this.state.fold })}>...</span>
						}
						{
							this.props.displayItemCount && <span className="item-count">Array[{this.state.value.length}]</span>
						}
						<ItemToolBar items={_btns} />
					</div>
					<div className="array-values">
						{
							this.state.value.map(function (item, index){
								var _type = Object.prototype.toString.call(item).toLowerCase().split(' ')[1].replace(']', ''),
									_Type = FIELDS[_type];
								return <div key={index.toString() + Math.random().toString()} className="array-value-item">
									<div className="separator">-</div>
									<_Type type={_type}
										value={item}
										parent={this}
										fold={this.props.fold}
										schema={this.props.schema}
										displayClosure={this.props.displayClosure}
										displayItemCount={this.props.displayItemCount}
										onValueInitial={(key, value, child)=>this.__onChildValueInitial(key, value, child, index)}
										onChange={(data, child)=>this.__onChildChange(data, child, index)}
										onRemove={(key, child)=>this.__onChildRemove(key, child, index)} />
								</div>
							}.bind(this))
						}
					</div>
					{
						this.props.displayClosure && <span className="closure-end">{']'}</span>
					}
				</div>
			</div>
		);
	}
});

module.exports = _array;
