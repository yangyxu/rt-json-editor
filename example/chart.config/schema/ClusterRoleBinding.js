module.exports = {
    "name": {
        type: 'string',
        required: true
    },
    "namespace": {
        type: 'string',
        required: true
    },
    "roleRef": {
        type: 'object',
        required: true,
        schema: {
            "apiGroup": { type: 'string', required: true },
            "kind": { type: 'string', required: true },
            "name": { type: 'string', required: true }
        }
    },
    "subjects": {
        type: 'array',
        required: true,
        schema: {
            "kind": { type: 'string', required: true },
            "apiGroup": { type: 'string', required: true },
            "name": { type: 'string', required: true },
            "namespace": { type: 'string', required: true }
        }
    }
};