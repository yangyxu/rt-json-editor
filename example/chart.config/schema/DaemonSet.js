module.exports = {
    "name": {
        type: 'string',
        required: true
    },
    "namespace": {
        type: 'string',
        required: true
    },
    "containers": {
        type: 'array',
        required: true,
        schema: {
            "name": {
                type: 'string',
                required: true
            },
            "image": {
                type: 'string',
                required: true
            },
            "command": {
                type: 'array',
                required: true
            },
            "args": {
                type: 'array',
                required: true
            },
            "workingDir": {
                type: 'string',
                required: true
            },
	        "ports": {
                type: 'array',
                schema: {
                    "name": {
                        type: 'string',
                        required: true
                    },
                    "hostPort": {
                        type: 'int',
                        required: true
                    },
                    "containerPort": {
                        type: 'int',
                        required: true
                    },
                    "protocol": {
                        type: 'string',
                        required: true
                    },
                    "hostIP": {
                        type: 'string',
                        required: true
                    }
                }
            },
            "env": {
                type: 'array',
                schema: {
                    "name": {
                        type: 'string', required: true
                    },
                    "value": {
                        type: 'string', required: true
                    }
                }
            },
            "resources": {
                type: 'object',
                schema: {
                    "limits": {
                        type: 'object', required: true
                    },
                    "requests": {
                        type: 'object', required: true
                    }
                }
            },
            "volumeMounts": {
                type: 'array',
                schema: {
                    "name": {
                        type: 'string', required: true
                    },
                    "readOnly": {
                        type: 'string', required: true
                    },
                    "mountPath": {
                        type: 'string', required: true
                    },
                    "subPath": {
                        type: 'string', required: true
                    }
                }
            },
            "livenessProbe": {
                type: 'object',
                required: true,
                schema: {
                    "initialDelaySeconds": {
                        type: 'int',
                        required: true
                    },
                    "timeoutSeconds": {
                        type: 'int',
                        required: true
                    },
                    "periodSeconds": {
                        type: 'int',
                        required: true
                    },
                    "successThreshold": {
                        type: 'int',
                        required: true
                    },
                    "failureThreshold": {
                        type: 'int',
                        required: true
                    }
                }
            },
            "readinessProbe": {
                type: 'object',
                required: true,
                schema: {
                    "initialDelaySeconds": {
                        type: 'int',
                        required: true
                    },
                    "timeoutSeconds": {
                        type: 'int',
                        required: true
                    },
                    "periodSeconds": {
                        type: 'int',
                        required: true
                    },
                    "successThreshold": {
                        type: 'int',
                        required: true
                    },
                    "failureThreshold": {
                        type: 'int',
                        required: true
                    }
                }
            },
            "imagePullPolicy": {
                type: 'string',
                required: true
            }
        }
    }
};