require('./index.less');
var ReactDOM = require('react-dom');
var JSONEditor = require('./JSONEditor.js');
console.log('xxxx');
ReactDOM.render(
    <JSONEditor />,
    document.getElementById('container'),
);
