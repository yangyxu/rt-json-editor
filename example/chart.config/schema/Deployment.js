module.exports = {
    "name": "",
    "namespace": "",
    "replicas": 0,
    "containers": [
        {
            "name": "",
            "image": "",
            "command": [],
            "args": [],
            "workingDir": "",
	        "ports": [
                {
                    "name": "",
                    "hostPort": 0,
                    "containerPort": 0,
                    "protocol": "",
                    "hostIP": ""
                }
            ],
            "env": [
                {
                    "name": "",
                    "value": ""
                }
            ],
            "resources": {
                "limits": {

                },
                "requests": {

                }
            },
            "volumeMounts": [
                {
                    "name": "",
                    "readOnly": true,
                    "mountPath": "",
                    "subPath": ""
                }
            ],
            "livenessProbe": {
                "initialDelaySeconds": 0,
                "timeoutSeconds": 0,
                "periodSeconds": 0,
                "successThreshold": 0,
                "failureThreshold": 0
            },
            "readinessProbe": {
                "initialDelaySeconds": 0,
                "timeoutSeconds": 0,
                "periodSeconds": 0,
                "successThreshold": 0,
                "failureThreshold": 0
            },
            "imagePullPolicy": ""
        }
    ]
};