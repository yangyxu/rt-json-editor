module.exports = {
    "name": { type: 'string' },
    "namespace": { type: 'string' },
    "rules": {
        type: 'array',
        schema: {
            "verbs": { type: 'array' },
            "apiGroups": { type: 'array' },
            "resources": { type: 'array' }
        }
    }
};