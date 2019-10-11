module.exports = {
    "name": { type: 'string' },
    "namespace": { type: 'string' },
    "type": { type: 'string' },
	"selector": { type: 'object' },
	"ports": {
        type: 'array',
        schema: {
            "name": { type: 'string' },
            "protocol": { type: 'string' },
            "port": { type: 'number' },
            "nodePort": { type: 'number' }
        }
    }
};