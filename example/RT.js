var React = require('react');
var ResourceType = require('./chart.config/ResourceType');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			DaemonSet: {
                name: '',
                namespace: '',
                containers: [
                    {
                        name: '',
                        image: '',
                        command: [],
                        args: [],
                        workingDir: '',
                        ports: [
                            {
                                name: '',
                                hostPort: '',
                                containerPort: '',
                                protocol: '',
                                hostIP: ''
                            }
                        ],
                        env: [
                            {
                                name: '',
                                value: ''
                            }
                        ],
                        resources: {
                            limits: {
        
                            },
                            requests: {
        
                            }
                        },
                        volumeMounts: [
                            {
                                name: '',
                                readOnly: false,
                                mountPath: '',
                                subPath: ''
                            }
                        ],
                        livenessProbe: {
                            initialDelaySeconds: 0,
                            timeoutSeconds: 0,
                            periodSeconds: 0,
                            successThreshold: 0,
                            failureThreshold: 0
                        },
                        readinessProbe: {
                            initialDelaySeconds: 0,
                            timeoutSeconds: 0,
                            periodSeconds: 0,
                            successThreshold: 0,
                            failureThreshold: 0
                        },
                        imagePullPolicy: ''
                    }
                ]
            }
		};
	},
	render: function(){
		return (
            <ResourceType type="ServiceAccount" />
        );
	}
});