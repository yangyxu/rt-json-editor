"use strict";

require('./array.less');

var React = require('react');

var ItemToolBar = require('./ItemToolBar.js');

var ObjectAddItem = require('./ObjectAddItem.js');

var _array = React.createClass({
  displayName: "_array",
  getDefaultProps: function getDefaultProps() {
    return {
      value: [],
      schema: {},
      fold: false,
      displayClosure: true,
      displayItemCount: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      _key: this.props._key,
      value: this.props.value,
      fold: this.props.fold,
      adding: false,
      editing: false
    };
  },
  __onChildValueInitial: function __onChildValueInitial(key, value, child, index) {},
  __onChildRemove: function __onChildRemove(key, child, index) {
    if (window.confirm("Do you really want to delete the key?")) {
      this.state.value.splice(index, 1);
      this.forceUpdate();
      this.props.onChange && this.props.onChange({
        key: key,
        value: undefined
      }, child, this);
    }
  },
  __onChildChange: function __onChildChange(data, child, index) {
    if (this == child.props.parent) {
      if (data.prevValue != data.value) {
        this.state.value.splice(index, 1, data.value);
        this.forceUpdate();
      }
    }

    this.props.onChange && this.props.onChange(data, child, this);
  },
  __onRemove: function __onRemove() {
    this.props.onRemove && this.props.onRemove(this.props._key);
  },
  __onCreateSubmit: function __onCreateSubmit(data) {
    this.state.value.push(data.value);
    this.state.adding = false;
    this.forceUpdate();
    this.props.onChange && this.props.onChange(data, this, this);
  },
  __onCreateCancel: function __onCreateCancel() {
    this.setState({
      adding: false
    });
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
  render: function render() {
    var _this = this;

    var FIELDS = {
      array: _array,
      object: require('./object.js'),
      "function": require('./function.js'),
      string: require('./string.boolean.date.number.js'),
      "boolean": require('./string.boolean.date.number.js'),
      date: require('./string.boolean.date.number.js'),
      number: require('./string.boolean.date.number.js')
    };
    var _btns = [{
      icon: 'fa-plus',
      onClick: function onClick() {
        return _this.setState({
          adding: true
        });
      }
    }];

    if (this.props._key) {
      _btns.unshift({
        icon: 'fa-edit',
        onClick: function onClick() {
          return _this.setState({
            editing: true
          });
        }
      });
    }

    if (this.props.parent) {
      _btns.push({
        icon: 'fa-trash',
        onClick: this.__onRemove
      });
    }

    console.log(this.props);
    return React.createElement("div", {
      className: "rt-json-editor-field rt-json-editor-field-object rt-json-editor-field-array " + (this.state.fold ? ' fold' : ' unfold') + (this.props.required ? ' required' : '')
    }, this.state.adding && React.createElement(ObjectAddItem, {
      _key: null,
      onSubmit: this.__onCreateSubmit,
      onCancel: this.__onCreateCancel
    }), React.createElement("div", {
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
    }, this.state.editing ? React.createElement("input", {
      onBlur: this.__onKeyInputBlur,
      defaultValue: this.state._key,
      className: "key-input",
      name: "_key",
      type: "text"
    }) : React.createElement("span", {
      className: "field-key _key-name"
    }, this.props.label || this.state._key), React.createElement("span", {
      className: "_key-colon"
    }, ":")), this.props.displayClosure && React.createElement("span", {
      className: "closure-start"
    }, '['), !!this.state.fold && React.createElement("span", {
      className: "dots"
    }, "..."), this.props.displayItemCount && React.createElement("span", {
      className: "item-count"
    }, "Array[", this.state.value.length, "]"), React.createElement(ItemToolBar, {
      items: _btns
    })), React.createElement("div", {
      className: "array-values"
    }, this.state.value.map(function (item, index) {
      var _this2 = this;

      var _type = Object.prototype.toString.call(item).toLowerCase().split(' ')[1].replace(']', ''),
          _Type = FIELDS[_type];

      return React.createElement("div", {
        key: index.toString() + Math.random().toString(),
        className: "array-value-item"
      }, React.createElement("div", {
        className: "separator"
      }, "-"), React.createElement(_Type, {
        type: _type,
        value: item,
        parent: this,
        fold: this.props.fold,
        displayClosure: this.props.displayClosure,
        displayItemCount: this.props.displayItemCount,
        onValueInitial: function onValueInitial(key, value, child) {
          return _this2.__onChildValueInitial(key, value, child, index);
        },
        onChange: function onChange(data, child) {
          return _this2.__onChildChange(data, child, index);
        },
        onRemove: function onRemove(key, child) {
          return _this2.__onChildRemove(key, child, index);
        }
      }));
    }.bind(this))), this.props.displayClosure && React.createElement("span", {
      className: "closure-end"
    }, ']')));
  }
});

module.exports = _array;