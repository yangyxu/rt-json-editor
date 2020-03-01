require('./ResourceType.less');
var React = require('react');
var FIELDS = require('../../../src/index.js').form;
require('codemirror/lib/codemirror.css');
require('codemirror/lib/codemirror.js');
require('codemirror/theme/material.css');
require('codemirror/mode/yaml/yaml.js');
require('codemirror/mode/javascript/javascript.js');
var CodeMirror = require('react-codemirror2').UnControlled;

var beautify = require('prettify-js');
module.exports = React.createClass({
    getInitialState: function (){
        return {
            value: {},
            code: 0,
            schema: require('./schema/' + this.props.type + '.js')
        }
    },
    __onChange: function (data, child, root){
        var _root = root || child;
        this.setState({
            value: _root.state.value
        });
		console.log('Changed: ', _root.state.value);
    },
    __save: function (){
        if(this.state.schemastring){
            this.state.code = Math.random();
            this.state.schema = JSON.parse(this.state.schemastring); 
            this.forceUpdate();
        }
    },
    render: function () {
        return (
            <div className="resource-container">
                <div className="title">
                    JSON Data Schema: 
                    <span className="btn" onClick={this.__save}>Save && Run</span>
                </div>
                <CodeMirror
                        value={beautify(this.state.schema)}
                        options={{
                            mode: 'javascript',
                            theme: 'material',
                            lineNumbers: true,
                            tabSize: 4
                        }}
                        onChange={(editor, data, value) => {
                            this.state.schemastring = value;
                            this.forceUpdate();
                        }}
                    />
                <div className="preview">
                    <div className="item">
                        <div className="title">JSON Editor: </div>
                        <FIELDS.object fold={false} key={this.props.type + '-' + this.state.code}
                            displayClosure={true} 
                            displayItemCount={true} 
                            label={this.props.type} 
                            value={this.props.value} 
                            schema={this.state.schema} 
                            onChange={this.__onChange} />
                    </div>
                    {
                        this.state.value && <div className="item">
                            <div className="title">Changed Value: </div>
                            <pre>{beautify(this.state.value)}</pre>
                        </div>
                    }
                </div>
                
            </div>
        );
    }
});