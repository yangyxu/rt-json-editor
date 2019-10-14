"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

require('./object.less');

var React = require('react');

var ItemToolBar = require('./ItemToolBar.js');

var ObjectAddItem = require('./ObjectAddItem.js');

var _object = React.createClass({
  displayName: "_object",
  getDefaultProps: function getDefaultProps() {
    return {
      _key: null,
      fold: true,
      parent: null,
      editable: true,
      keyEditable: false,
      displayClosure: true,
      displayItemCount: true
    };
  },
  getInitialState: function getInitialState() {
    var _data = this.__joinValueAndSchema(this.props.value, this.props.schema);

    return {
      _key: this.props._key,
      value: _data.value,
      schema: _data.schema,
      fold: this.props.fold,
      adding: false,
      editing: false
    };
  },
  __getSchemaInitialValue: function __getSchemaInitialValue(schema) {
    if (schema.value !== undefined) {
      return schema.value;
    }

    switch (schema.type) {
      case "string":
        return '';

      case "number":
        return 0;

      case "boolean":
        return false;

      case "array":
        return [];

      case "object":
        return {};
    }
  },
  __joinValueAndSchema: function __joinValueAndSchema(value, schema) {
    //var _values = Object.assign({}, value);
    var _values = value;

    if (_values == undefined) {
      _values = {};
      this.props.onValueInitial && this.props.onValueInitial(this.props._key, _values, this);
    }

    var _schema = Object.assign({}, schema),
        _value = null;

    for (var key in _values) {
      _value = _values[key];

      if (_schema[key]) {
        _schema[key].value = _value || _schema[key].value;
      } else {
        _schema[key] = {
          type: Object.prototype.toString.call(_value, this).toLowerCase().split(' ')[1].replace(']', ''),
          value: _value
        };
      }
    }

    for (var key in _schema) {
      if (_schema[key]) {
        _values[key] = this.__getSchemaInitialValue(_schema[key]);
      } else {//console.log(schema, _schema);
      }
    }

    return {
      value: _values,
      schema: _schema
    };
  },
  __onCreateSubmit: function __onCreateSubmit(data) {
    data.updated = true;
    this.state.value[data._key] = data.value;
    this.state.schema[data._key] = data;
    this.state.adding = false;
    this.forceUpdate();
    this.props.onChange && this.props.onChange(data, this);
  },
  __onCreateCancel: function __onCreateCancel() {
    this.setState({
      adding: false
    });
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.props._key, this);
  },
  __onChildValueInitial: function __onChildValueInitial(key, value, child) {
    if (key && this.state.value.hasOwnProperty(key)) {
      this.state.value[key] = value;
    }
  },
  __onChildRemove: function __onChildRemove(key, child) {
    if (window.confirm("Do you really want to delete the key?")) {
      this.state.value[key] = null;
      this.state.schema[key] = null;
      delete this.state.value[key];
      delete this.state.schema[key];
      this.forceUpdate();
      this.props.onChange && this.props.onChange(key, this);
    }
  },
  __onChildChange: function __onChildChange(data, child) {
    if (this == child.props.parent) {
      if (data.key && data.prevKey) {
        if (data.key != data.prevKey) {
          this.state.value[data.prevKey] = null;
          delete this.state.value[data.prevKey];
        }
      }

      if (data.key || data.prevKey) {
        this.state.value[data.key || data.prevKey] = data.value;
      }

      if (child.props.type == 'array') {
        if (!this.state.value[child.props._key]) {
          this.state.value[child.props._key] = child.state.value;
        }
      }
    }

    this.props.onChange && this.props.onChange(data, child, this);
  },
  __onKeyInputBlur: function __onKeyInputBlur(event) {
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
  __renderDesc: function __renderDesc() {
    if (this.props.desc) {
      return React.createElement("div", {
        className: "field-desc"
      }, this.props.desc);
    }
  },
  __onKeyInputKeyUp: function __onKeyInputKeyUp(event) {
    if (event.keyCode == 13) {
      this.__onKeyInputBlur(event);
    }
  },
  __parseValue: function __parseValue(key) {
    var _value = this.state.value[key];

    if (Object.prototype.toString.call(_value, this).toLowerCase().split(' ')[1].replace(']', '') == 'function') {
      _value = _value.call(this, this);
      this.state.value[key] = _value;
    }

    return _value;
  },
  render: function render() {
    var _this = this;

    var _btns = [];

    if (this.props.editable !== false) {
      _btns.push({
        icon: 'fa-plus',
        onClick: function onClick() {
          return _this.setState({
            adding: true,
            fold: false
          });
        }
      });
    }

    if (this.props._key && this.props.keyEditable) {
      _btns.unshift({
        icon: 'fa-edit',
        onClick: function onClick() {
          return _this.setState({
            editing: true
          });
        }
      });
    }

    if (this.props.parent && this.props.removal) {
      _btns.push({
        icon: 'fa-trash',
        onClick: this.__onRemove
      });
    }

    return React.createElement("div", {
      className: "rt-json-editor-field rt-json-editor-field-object " + (this.state.fold ? 'fold' : 'unfold')
    }, this.state.adding && React.createElement("div", {
      className: "adding-form-container"
    }, React.createElement(ObjectAddItem, {
      onSubmit: this.__onCreateSubmit,
      onCancel: this.__onCreateCancel
    })), React.createElement("div", {
      className: "field-warp object-warp"
    }, React.createElement("div", {
      className: "meta-data"
    }, React.createElement("span", {
      className: "fold-icon",
      onClick: function onClick() {
        return _this.setState({
          fold: !_this.state.fold
        });
      }
    }, React.createElement("i", {
      className: "fas " + (this.state.fold ? 'fa-caret-right' : 'fa-caret-down')
    })), this.state._key && React.createElement("div", {
      className: "_key"
    }, this.state.editing && this.props.keyEditable ? React.createElement("input", {
      onKeyUp: this.__onKeyInputKeyUp,
      onBlur: this.__onKeyInputBlur,
      defaultValue: this.state._key,
      className: "key-input",
      name: "_key",
      type: "text"
    }) : React.createElement("span", {
      title: this.props.title,
      className: "_key-name"
    }, this.state._key), React.createElement("span", {
      className: "_key-colon"
    }, ":")), this.props.label && React.createElement("span", {
      className: "label"
    }, this.props.label), this.props.displayClosure && React.createElement("span", {
      className: "closure-start"
    }, '{'), !!this.state.fold && React.createElement("span", {
      className: "dots",
      onClick: function onClick() {
        return _this.setState({
          fold: !_this.state.fold
        });
      }
    }, "..."), this.props.displayItemCount && React.createElement("span", {
      className: "item-count"
    }, "Object{" + Object.keys(this.state.value).length + "}"), this.props.editable && React.createElement(ItemToolBar, {
      items: _btns
    })), this.__renderDesc(), React.createElement("div", {
      className: "object-key-value-pair"
    }, Object.keys(this.state.schema).map(function (key, index) {
      var _item = this.state.schema[key],
          _Type = FIELDS[_item.type];

      if (_Type) {
        return React.createElement(_Type, _extends({}, _item, {
          key: index,
          _key: key,
          parent: this,
          value: this.__parseValue(key),
          fold: this.props.fold,
          displayClosure: this.props.displayClosure,
          displayItemCount: this.props.displayItemCount,
          onValueInitial: this.__onChildValueInitial,
          onChange: this.__onChildChange,
          onRemove: this.__onChildRemove
        }));
      }
    }.bind(this))), this.props.displayClosure && React.createElement("span", {
      className: "closure-end"
    }, '}')));
  }
});

var FIELDS = {
  object: _object,
  array: require('./array.js'),
  "function": require('./function.js'),
  string: require('./string.boolean.date.number.js'),
  "boolean": require('./string.boolean.date.number.js'),
  date: require('./string.boolean.date.number.js'),
  number: require('./string.boolean.date.number.js')
};
module.exports = _object;