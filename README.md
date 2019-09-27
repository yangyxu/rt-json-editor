A draggable toggle-switch component for React.

[![npm](https://img.shields.io/npm/v/rt-json-editor.svg)](https://www.npmjs.com/package/rt-json-editor)
[![npm](https://img.shields.io/npm/dm/rt-json-editor.svg)](https://www.npmjs.com/package/rt-json-editor)

- **Draggable** with the mouse or with a touch screen.
- **Customizable** 

## Demo

[Take a look at the demo](https://yangyxu.github.io/rt-json-editor/www/index.html)

## Installation

```bash
npm install rt-json-editor
```

## Usage

```javascript

module.exports = {
    array: {
        label: 'Array',
        type: 'array',
        value: ['1', '2', '3'],
        title: 'array',
        required: true
    },
    kind: {
        value: 'Deployment'
    },
    metadata: {
        editable: false,
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

```

<img src="https://github.com/yangyxu/rt-json-editor/blob/master/images/demo.png" />

<img src="https://github.com/yangyxu/rt-json-editor/blob/master/images/demo-add.png" />

<img src="https://github.com/yangyxu/rt-json-editor/blob/master/images/demo-changed.png" />



## License

MIT