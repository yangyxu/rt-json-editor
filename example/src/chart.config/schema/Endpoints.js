module.exports = {
    "name": { type: 'string' },
    "namespace": { type: 'string' },
    "subsets": {
        type: 'array',
        schema: {
            "addresses": {
                type: 'object',
                schema: {
                    "ip": {type: 'string'},
                    "hostname": {type: 'string'}
                }
            },
            "ports": {
                type: 'object',
                schema: {
                    "name": {type: 'string'},
                    "port": {type: 'number'},
                    "protocol": {type: 'string'}
                }
            }
        }
    }
};