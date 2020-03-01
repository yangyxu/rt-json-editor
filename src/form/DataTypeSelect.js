var React = require('react');
module.exports = React.createClass({
	render:function(){
		return (
			<select required className="rt-json-editor-data-type-select">
				{
					[
						'string', 'number', 'boolean', 'date', 'object', 'array', 'function'
					].map(function (item, index){
						return <option key={index} value={item}>{item}</option>;
					})
				}
			</select>
		);
	}
});
