require('./index.less');
var ReactDOM = require('react-dom');
var JSONEditor = require('./JSONEditor.js');
ReactDOM.render(
    <JSONEditor />,
    document.getElementById('container'),
);
