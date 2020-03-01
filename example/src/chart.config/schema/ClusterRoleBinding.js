module.exports = {
    "name": {
        type: 'string'
    },
    "namespace": {
        type: 'string'
    },
    "roleRef": {
        type: 'object',
        schema: {
            "apiGroup": { type: 'string' },
            "kind": { type: 'string' },
            "name": { type: 'string' }
        }
    },
    "subjects": {
        type: 'array',
        schema: {
            "kind": { type: 'string' },
            "apiGroup": { type: 'string' },
            "name": { type: 'string' },
            "namespace": { type: 'string' }
        }
    }
};