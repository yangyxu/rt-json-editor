module.exports = {
    kind: {
        type: 'string',
        required: true,
        values: [ 'Deployment', 'Service', 'ConfigureMap', 'Secrets' ]
    },
    apiVersion: {
        type: 'string',
        required: true
    },
    metadata: {
        type: 'object'
    }
};