module.exports = {
    "name": {
        type: 'string',
        keyEditable: false,
        label: 'Deploy Name',
        required: true
    },
    "namespace": {
        type: 'string',
        label: 'Namespace',
        value: 'default',
        keyEditable: false
    },
    "replicas": {
        type: 'number',
        label: 'Replicas',
        value: 1,
        required: true,
        keyEditable: false
    },
    "containers": {
        type: 'array',
        label: 'Containers',
        required: true,
        schema: {
            "id": {
                type: 'number', 
                hidden: true,
                value: function (owner){
                    return owner.props.index;
                }
            },
            "name": { type: 'string' },
            "image": { type: 'string' },
            "command": { type: 'array', dataType: 'string' },
            "args": { type: 'array', dataType: 'string' },
            "workingDir": { type: 'string' },
	        "ports": {
                type: 'array',
                schema: {
                    "name": { type: 'string' },
                    "hostPort": { type: 'number' },
                    "containerPort": { type: 'number' },
                    "protocol": { 
                        type: 'string',
                        values: ["UDP", "TCP", "SCTP"]
                    },
                    "hostIP": { type: 'string' }
                }
            },
            "env": {
                type: 'array',
                schema: {
                    "name": { type: 'string' },
                    "value": [
                        { key: 'value', type: 'string' },
                        {
                            key: 'valueFrom',
                            type: 'object',
                            schema: {
                                secretKeyRef: {
                                    type: 'object',
                                    schema: {
                                        key: {
                                            value: 'AuthToken',
                                            type: 'string'
                                        },
                                        name: {
                                            value: 'platform-secret',
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    ]
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
            // "livenessProbe": {
            //     type: 'object',
            //     schema: {
            //         "initialDelaySeconds": { type: 'number' },
            //         "timeoutSeconds": { type: 'number' },
            //         "periodSeconds": { type: 'number' },
            //         "successThreshold": { type: 'number' },
            //         "failureThreshold": { type: 'number' }
            //     }
            // },
            // "readinessProbe": {
            //     type: 'object',
            //     schema: {
            //         "initialDelaySeconds": { type: 'number' },
            //         "timeoutSeconds": { type: 'number' },
            //         "periodSeconds": { type: 'number' },
            //         "successThreshold": { type: 'number' },
            //         "failureThreshold": { type: 'number' }
            //     }
            // },
            "imagePullPolicy": { 
                type: 'string',
                values: ["Always", "Never", "IfNotPresent"]
            }
        }
    }
};