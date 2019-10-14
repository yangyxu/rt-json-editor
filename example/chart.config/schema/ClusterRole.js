module.exports = {
    "name": {
        type: 'string'
    },
    "namespace": {
        type: 'string'
    },
    "rules": {
        type: 'array',
        schema: {
            "id": { 
                type: 'number', 
                hidden: true,
                value: function (owner){
                    return owner.props.index;
                }
            },
            "verbs": { type: 'array' },
            "apiGroups": { type: 'array' },
            "resources": { type: 'array' }
        }
    }
};