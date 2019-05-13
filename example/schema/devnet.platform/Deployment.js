module.exports = {
    array: {
        type: 'array',
        value: ['1', '2', '3'],
        required: true
    },
    kind: {
        value: 'Deployment'
    },
    metadata: {
        type: 'object',
        schema: {
            name: { type: 'string', required: true },
            labels: {
                type: 'object',
                schema: {
                    app: {
                        type: 'string'
                    }
                }
            }
        }
    },
    spec: {
        type: 'object',
        schema: {
            replicas: {
                type: 'number', 
                required: true
            },
            template: {
                type: 'object',
                schema: {
                    metadata: {
                        type: 'object',
                        schema: {
                            labels: {
                                type: 'object',
                                schema: {
                                    app: {
                                        type: 'string'
                                    },
                                    tier: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    },
                    spec: {
                        type: 'object',
                        schema: {
                            containers: {
                                type: 'object',
                                schema: {
                                    name: {
                                        type: 'string'
                                    },
                                    image: {
                                        type: 'string',
                                        required: true
                                    },
                                    ports: {
                                        type: 'array',
                                        schema: {
                                            containerPort: {
                                                type: 'number',
                                                required: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};