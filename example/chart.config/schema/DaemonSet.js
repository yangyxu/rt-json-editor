module.exports = {
    "name": {
        type: 'string',
        keyEditable: false
    },
    "namespace": {
        type: 'string',
        keyEditable: true
    },
    "containers": {
        type: 'array',
        schema: {
            "command": {
                type: 'array'
            },
            "name": {
                type: 'string'
            },
            "image": {
                type: 'string'
            },
            "args": {
                type: 'array'
            },
            "workingDir": {
                type: 'string',
            },
	        "ports": {
                type: 'array',
                schema: {
                    "name": {
                        type: 'string'
                    },
                    "hostPort": {
                        type: 'number'
                    },
                    "containerPort": {
                        type: 'number'
                    },
                    "protocol": {
                        type: 'string'
                    },
                    "hostIP": {
                        type: 'string'
                    }
                }
            },
            "env": {
                type: 'array',
                schema: {
                    "name": {
                        type: 'string'
                    },
                    "value": {
                        type: 'string'
                    }
                }
            },
            "resources": {
                type: 'object',
                schema: {
                    "limits": {
                        type: 'object'
                    },
                    "requests": {
                        type: 'object'
                    }
                }
            },
            "volumeMounts": {
                type: 'array',
                schema: {
                    "name": {
                        type: 'string'
                    },
                    "readOnly": {
                        type: 'string'
                    },
                    "mountPath": {
                        type: 'string'
                    },
                    "subPath": {
                        type: 'string'
                    }
                }
            },
            "livenessProbe": {
                type: 'object',
                required: true,
                schema: {
                    "initialDelaySeconds": {
                        type: 'number'
                    },
                    "timeoutSeconds": {
                        type: 'number'
                    },
                    "periodSeconds": {
                        type: 'number'
                    },
                    "successThreshold": {
                        type: 'number'
                    },
                    "failureThreshold": {
                        type: 'number'
                    }
                }
            },
            "readinessProbe": {
                type: 'object',
                required: true,
                desc: 'This is array data.',
                schema: {
                    "initialDelaySeconds": {
                        type: 'number'
                    },
                    "timeoutSeconds": {
                        type: 'number'
                    },
                    "periodSeconds": {
                        type: 'number'
                    },
                    "successThreshold": {
                        type: 'number'
                    },
                    "failureThreshold": {
                        type: 'number'
                    }
                }
            },
            "imagePullPolicy": {
                type: 'string'
            }
        }
    }
};