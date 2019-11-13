"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./dynamic.less');

var React = require('react');

var ItemToolBar = require('./ItemToolBar.js');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      removal: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value,
      valueSchema: this.__matchItem(this.props.keys, this.props._key)
    };
  },
  __matchItem: function __matchItem(data, key) {
    for (var i = 0, _len = data.length; i < _len; i++) {
      if (data[i].key == key) {
        return data[i];
      }
    }
  },
  __renderEditableKey: function __renderEditableKey() {
    return React.createElement("select", {
      className: "editable-key",
      onChange: this.__doKeyChange,
      required: true,
      defaultValue: this.state._key
    }, this.props.keys.map(function (item, index) {
      return React.createElement("option", {
        key: index,
        value: item.key
      }, item.key);
    }));
  },
  __doKeyChange: function __doKeyChange(event) {
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
  __renderInput: function __renderInput() {
    if (this.state.valueSchema) {
      var types = require('./index');

      var _Type = types[this.state.valueSchema.type];

      if (_Type) {
        return React.createElement(_Type, _extends({}, this.props, this.state.valueSchema, {
          _key: this.state._key,
          value: this.state.value
        }));
      }
    }
  },
  __renderDesc: function __renderDesc() {
    if (this.props.desc) {
      return React.createElement("div", {
        className: "field-desc"
      }, React.createElement("i", {
        className: "fa fa-info-circle"
      }), this.props.desc);
    }
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.state._key, this);
  },
  render: function render() {
    var _toolbars = [];

    if (this.props.removal && !this.props.required) {
      _toolbars.push({
        icon: 'fa-trash',
        onClick: this.__onRemove
      });
    }

    return React.createElement("div", {
      className: "rt-json-editor-form rt-json-editor-form-dynamic" + (this.props.required ? ' required' : '') + (this.props.hidden ? ' hidden' : '') + ' ' + (this.props.className || ''),
      style: this.props.style
    }, React.createElement("div", {
      className: "field-warp dynamic-editing"
    }, React.createElement("div", {
      className: "dynamic-meta meta-data"
    }, this.__renderEditableKey(), React.createElement(ItemToolBar, {
      items: _toolbars
    })), React.createElement("div", {
      className: "dynamic-input"
    }, this.__renderInput())), this.__renderDesc());
  }
});