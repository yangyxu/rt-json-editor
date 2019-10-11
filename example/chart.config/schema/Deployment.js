module.exports = {
    "name": {
        type: 'string',
        keyEditable: false
    },
    "namespace": {
        type: 'string',
        keyEditable: false
    },
    "replicas": {
        type: 'number',
        keyEditable: false
    },
    "containers": {
        type: 'array',
        schema: {
            "name": { type: 'string' },
            "image": { type: 'string' },
            "command": { type: 'array' },
            "args": { type: 'array' },
            "workingDir": { type: 'string' },
	        "ports": {
                type: 'array',
                schema: {
                    "name": { type: 'string' },
                    "hostPort": { type: 'number' },
                    "containerPort": { type: 'number' },
                    "protocol": { type: 'string' },
                    "hostIP": { type: 'string' }
                }
            },
            "env": {
                type: 'array',
                schema: {
                    "name": { type: 'string' },
                    "value": { type: 'string' }
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
                    "name": { type: 'string' },
                    "readOnly": { type: 'boolean' },
                    "mountPath": { type: 'string' },
                    "subPath": { type: 'string' }
                }
            },
            "livenessProbe": {
                type: 'object',
                schema: {
                    "initialDelaySeconds": { type: 'number' },
                    "timeoutSeconds": { type: 'number' },
                    "periodSeconds": { type: 'number' },
                    "successThreshold": { type: 'number' },
                    "failureThreshold": { type: 'number' }
                }
            },
            "readinessProbe": {
                type: 'object',
                schema: {
                    "initialDelaySeconds": { type: 'number' },
                    "timeoutSeconds": { type: 'number' },
                    "periodSeconds": { type: 'number' },
                    "successThreshold": { type: 'number' },
                    "failureThreshold": { type: 'number' }
                }
            },
            "imagePullPolicy": { type: 'string' }
        }
    }
};