"use strict";

require('./ObjectAddItem.less');

require('codemirror/lib/codemirror.css');

require('codemirror/lib/codemirror.js');

require('codemirror/theme/material.css');

require('codemirror/mode/yaml/yaml.js');

require('codemirror/mode/javascript/javascript.js');

var React = require('react');

var Radio = require('../radio/Radio.js');

var CodeMirror = require('react-codemirror2').UnControlled; //console.log(codemirror2);
//import { UnControlled as CodeMirror } from 'react-codemirror2';


module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      _key: '',
      value: null,
      fold: true,
      parent: null,
      displayClosure: true,
      displayItemCount: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      type: 'string',
      value: this.props.value
    };
  },
  __onKeyChange: function __onKeyChange(event) {
    var _input = event.target;
    this.setState({
      _key: _input.value
    });
  },
  __onSelectChange: function __onSelectChange(event) {
    var _input = event.target;
    this.setState({
      type: _input.value
    });
  },
  __onInputChange: function __onInputChange(event) {
    var _input = event.target;
    this.setState({
      value: _input.value
    });
  },
  __renderValueInput: function __renderValueInput() {
    var _this = this;

    switch (this.state.type) {
      case "string":
        return React.createElement("input", {
          value: this.state.value,
          onChange: function onChange(event) {
            return _this.setState({
              value: event.target.value
            });
          },
          className: "input",
          name: "value",
          type: "text"
        });

      case "number":
        return React.createElement("input", {
          value: this.state.value,
          onChange: function onChange(event) {
            return _this.setState({
              value: event.target.value
            });
          },
          className: "input",
          name: "value",
          type: "number"
        });

      case "date":
        return React.createElement("input", {
          value: this.state.value,
          onChange: function onChange(event) {
            return _this.setState({
              value: event.target.value
            });
          },
          className: "input",
          name: "value",
          type: "date"
        });

      case "boolean":
        return React.createElement(Radio, {
          onChange: function onChange(data, index) {
            return _this.setState({
              value: data.value
            });
          },
          data: [{
            label: 'True',
            value: true
          }, {
            label: 'False',
            value: false
          }],
          style: {
            width: '100%'
          }
        });

      case "object":
      case "array":
      case "function":
        return React.createElement(CodeMirror, {
          value: '',
          options: {
            mode: 'json',
            theme: 'material',
            lineNumbers: true
          },
          onChange: function onChange(editor, data, value) {
            _this.state.value = value;

            _this.forceUpdate();
          }
        });
    }
  },
  __onCreate: function __onCreate() {
    if (this.state._key != undefined && !this.state._key) {
      this._keydom.focus();

      return alert("The Key is required."), false;
    }

    if (!this.state.type) {
      return alert("The Type is required."), false;
    }

    if (!this.state.value) {
      return alert("The Value is required."), false;
    } else {
      switch (this.state.type) {
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
  render: function render() {
    var _this2 = this;

    return React.createElement("form", {
      className: "rt-json-editor-object-add-item"
    }, this.state._key != null && React.createElement("div", {
      className: "form-item"
    }, React.createElement("span", {
      className: "label"
    }, "Key:"), React.createElement("input", {
      ref: function ref(_ref) {
        return _this2._keydom = _ref;
      },
      defaultValue: this.state._key,
      onChange: this.__onKeyChange,
      className: "input",
      name: "_key",
      type: "text"
    })), React.createElement("div", {
      className: "form-item"
    }, React.createElement("span", {
      className: "label"
    }, "Type:"), React.createElement("select", {
      required: true,
      defaultValue: this.state.value || "string",
      className: "rt-json-editor-data-type-select",
      onChange: this.__onSelectChange
    }, ['string', 'number', 'boolean', 'date', 'object', 'array', 'function'].map(function (item, index) {
      return React.createElement("option", {
        key: index,
        value: item
      }, item);
    }))), React.createElement("div", {
      className: "form-item"
    }, React.createElement("span", {
      className: "label"
    }, "Value: "), this.__renderValueInput()), React.createElement("div", {
      className: "form-btns"
    }, React.createElement("span", {
      onClick: this.__onCreate,
      className: "form-btn submit"
    }, React.createElement("i", {
      className: "fa fa-plus"
    }), "Create"), React.createElement("span", {
      onClick: this.props.onCancel,
      className: "form-btn cancel"
    }, React.createElement("i", {
      className: "fa fa-trash"
    }), "Cancel")));
  }
});