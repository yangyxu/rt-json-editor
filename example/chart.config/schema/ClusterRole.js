module.exports = {
    "name": {
        type: 'string',
        required: true
    },
    "namespace": {
        type: 'string',
        required: true
    },
    "rules": {
        type: 'array',
        required: true,
        schema: {
            "verbs": { type: 'array', required: true },
            "apiGroups": { type: 'array', required: true },
            "resources": { type: 'array', required: true }
        }
    }
};