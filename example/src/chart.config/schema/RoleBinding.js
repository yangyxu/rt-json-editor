module.exports = {
    "name": { type: 'string' },
    "namespace": { type: 'string' },
    "roleRef": {
        "apiGroup": { type: 'string' },
	    "kind": { type: 'string' },
	    "name": { type: 'string' }
    },
    "subjects": [
        {
            "kind": { type: 'string' },
            "apiGroup": { type: 'string' },
            "name": { type: 'string' },
            "namespace": { type: 'string' }
        }
    ]
};