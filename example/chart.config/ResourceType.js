var React = require('react');
var FIELDS = require('../../src/index.js');
module.exports = React.createClass({
    render: function () {
        var _schema = require('./schema/' + this.props.type + '.js');
        return (
            <div className="resource-container">
                <FIELDS.object fold={false} 
                    displayClosure={true} 
                    displayItemCount={true} 
                    label={this.props.type} 
                    value={this.props.value} 
                    schema={_schema} 
                    onChange={this.__onChange} />
            </div>
        );
    }
});