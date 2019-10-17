"use strict";

require('./string.boolean.date.number.less');

var React = require('react');

var ItemToolBar = require('./ItemToolBar.js');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      removal: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value,
      editing: false
    };
  },
  __parseDataType: function __parseDataType(value) {
    switch (this.props.type) {
      case "object":
      case "array":
        return JSON.parse(value);

      case "function":
        return eval(value);

      case "number":
        return new Number(value).valueOf();

      case "boolean":
        return new Boolean(value).valueOf();

      case "date":
        return new Date(value).toLocaleDateString();
    }
  },
  __onUpdate: function __onUpdate() {
    var _prevKey = this.state._key,
        _prevValue = this.state.value,
        _key = _prevKey,
        _value = _prevValue;

    if (this._keydom) {
      _key = this._keydom.value;
    }

    if (this._valuedom) {
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
    }, this);
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.state._key, this);
  },
  __renderValue: function __renderValue() {
    switch (this.props.type) {
      case "string":
        return React.createElement("span", {
          className: "field-value"
        }, "\"", this.state.value, "\"");

      case "boolean":
        return React.createElement("span", {
          className: "field-value"
        }, this.state.value.toString());

      case "date":
        return React.createElement("span", {
          className: "field-value"
        }, "\"", this.state.value, "\"");

      case "number":
        return React.createElement("span", {
          className: "field-value"
        }, this.state.value);
    }
  },
  __onInputKeyUp: function __onInputKeyUp(event) {
    if (event.keyCode == 13) {
      var _value = this.__parseDataType(event.target.value);

      this.setState({
        value: _value,
        editing: false
      });
      this.props.onChange && this.props.onChange({
        key: this.state._key,
        prevValue: this.state.value,
        value: _value
      }, this);
    }
  },
  __renderInput: function __renderInput() {
    var _this = this;

    if (this.props.type == "boolean") {
      return React.createElement("select", {
        ref: function ref(dom) {
          return _this._valuedom = dom;
        },
        required: true,
        defaultValue: this.state.value
      }, [true, false].map(function (item, index) {
        return React.createElement("option", {
          key: index,
          value: item
        }, item.toString());
      }));
    }

    if (this.props.values) {
      return React.createElement("select", {
        ref: function ref(dom) {
          return _this._valuedom = dom;
        },
        required: true,
        defaultValue: this.state.value
      }, this.props.values.map(function (item, index) {
        return React.createElement("option", {
          key: index,
          value: item
        }, item);
      }));
    }

    var _type = this.props.type || 'text';

    if (_type == 'string') {
      _type = 'text';
    }

    return React.createElement("input", {
      onKeyUp: this.__onInputKeyUp,
      ref: function ref(dom) {
        return _this._valuedom = dom;
      },
      defaultValue: this.state.value,
      className: "input",
      name: "value",
      type: _type
    });
  },
  __renderEditableKey: function __renderEditableKey() {
    var _this2 = this;

    if (this.state._key) {
      return !!this.props.required || !this.props.keyEditable ? React.createElement("span", {
        className: "field-key"
      }, this.props.label || this.state._key) : React.createElement("input", {
        ref: function ref(dom) {
          return _this2._keydom = dom;
        },
        className: "input",
        defaultValue: this.state._key,
        name: "_key",
        type: "text"
      });
    }
  },
  __renderDesc: function __renderDesc() {
    if (this.props.desc) {
      return React.createElement("div", {
        className: "field-desc"
      }, this.props.desc);
    }
  },
  render: function render() {
    var _this3 = this;

    var _toolbars = [];

    if (this.props.editable !== false) {
      _toolbars.push({
        icon: 'fa-edit',
        onClick: function onClick() {
          return _this3.setState({
            editing: true
          });
        }
      });
    }

    if (this.props.removal && !this.props.required) {
      _toolbars.push({
        icon: 'fa-trash',
        onClick: this.__onRemove
      });
    }

    return React.createElement("div", {
      className: "rt-json-editor-field rt-json-editor-field-string" + (this.props.required ? ' required' : '') + (this.props.hidden ? ' hidden' : '')
    }, !!this.state.editing ? React.createElement("div", {
      className: "field-warp string-editing editing-mode"
    }, React.createElement("div", {
      className: "meta-data"
    }, this.__renderEditableKey(), this.state._key && React.createElement("span", {
      className: "field-colon"
    }, ":"), this.__renderInput(), React.createElement("span", {
      className: "editing-btns"
    }, React.createElement("i", {
      onClick: this.__onUpdate,
      title: "CONFIRM",
      className: "icon-btn far fa-check-circle"
    }), React.createElement("i", {
      onClick: function onClick() {
        return _this3.setState({
          editing: false
        });
      },
      title: "CANCEL",
      className: "icon-btn far fa-times-circle"
    }))), this.__renderDesc()) : React.createElement("div", {
      className: "field-warp " + (this.props.type + "-warp")
    }, React.createElement("div", {
      className: "meta-data"
    }, this.state._key && React.createElement("span", {
      title: this.props.title,
      className: "field-key"
    }, this.props.label || this.state._key), this.state._key && React.createElement("span", {
      className: "field-colon"
    }, ":"), this.__renderValue(), React.createElement(ItemToolBar, {
      items: _toolbars
    })), this.__renderDesc()));
  }
});