require('./RT.less');
var React = require('react');
var ResourceType = require('./chart.config/ResourceType');
var Types = require('./chart.config/schema/index');

module.exports = React.createClass({
	getInitialState: function () {
		return {
            type: 'ClusterRole'
		};
	},
	render: function(){
		return (
            <div className="rt">
                <div className="header">
                    JSON Editor Examples
                </div>
                <div className="container">
                    <div className="left">
                        <ul className="types">
                            {
                                Object.keys(Types).map(function (type, index){
                                    return <li onClick={()=>this.setState({type: type})} className={"type " + (this.state.type==type?'curr':'')} key={index}>{type}</li>;
                                }.bind(this))
                            }
                        </ul>
                    </div>
                    <div className="right">
                        <ResourceType type={this.state.type} key={this.state.type} />
                    </div>
                </div>
                <div className="footer">
                    <a href="https://github.com/yangyxu/rt-json-editor">rt-json-editor</a>  By yangyxu
                </div>
            </div>
            
        );
	}
});