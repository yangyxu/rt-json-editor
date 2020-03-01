require('./index.less');
require('../../src/index.less');
require('../../src/index.js');
var React = require('react');
var ReactDOM = require('react-dom');
var RT = require('./RT.js');
ReactDOM.render(
    <RT />,
    document.getElementById('container'),
);
