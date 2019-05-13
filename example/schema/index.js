var schema = {
    "basic": require('./basic.js'),
    "Deployment": require('./devnet.platform/Deployment.js'),
    "devnet.platform": require('./devnet.platform/index.js')
}

function deepCopyJSONObject (target, source){
    var _value = null, 
        __value = null,
        _key = null;
    for(_key in target){
        _value = target[_key];
        __value = source[_key];
        if(__value==undefined){
            source[_key] = (Object.prototype.toString.call(_value) == "[object Object]") ? Object.assign({}, _value) : _value;
        } else {
            if(Object.prototype.toString.call(__value) == "[object Object]"){
                if(Object.prototype.toString.call(_value) == "[object Object]"){
                    source[_key] = deepCopyJSONObject(_value, __value);
                }
            }
        }
    }

    return source;
}

schema.getSchema = function (kind){
    return deepCopyJSONObject(schema.basic, Object.assign({}, schema[kind]));
}

module.exports = schema;