module.exports = {
    "value": [
        {
            key: 'value', 
            type: 'string' 
        },
        {
            key: 'valueForm',
            type: 'object',
            schema: {
                secretKeyRef: {
                    type: 'object',
                    schema: {
                        key: { value: 'AuthToken', type: 'string' },
                        name: { value: 'platform-secret', type: 'string' }
                    }
                }
            }
        }
    ],
    "name": {
        type: 'string',
        label: 'Name',
        textarea: true,
        removal: false,
        desc: 'The name is key word.'
    },
    "namespace": {
        type: 'string',
        removal: false,
        desc: 'The namespace such as xx.xx.xx.xx'
    },
    "rules": {
        type: 'array',
        childRemoval: true,
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