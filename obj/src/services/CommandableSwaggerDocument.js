"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandableSwaggerDocument = void 0;
/** @module services */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
// Todo: Refactor to use plan JS objects
class CommandableSwaggerDocument {
    constructor(baseRoute, config, commands) {
        this.content = '';
        this.version = "3.0.2";
        this.infoVersion = "1";
        this.baseRoute = baseRoute;
        this.commands = commands !== null && commands !== void 0 ? commands : [];
        config = config !== null && config !== void 0 ? config : new pip_services3_commons_nodex_1.ConfigParams();
        this.infoTitle = config.getAsStringWithDefault("name", "CommandableHttpService");
        this.infoDescription = config.getAsStringWithDefault("description", "Commandable microservice");
    }
    toString() {
        let data = new Map([
            ['openapi', this.version],
            ['info', new Map([
                    ['title', this.infoTitle],
                    ['description', this.infoDescription],
                    ['version', this.infoVersion],
                    ['termsOfService', this.infoTermsOfService],
                    ['contact', new Map([
                            ['name', this.infoContactName],
                            ['url', this.infoContactUrl],
                            ['email', this.infoContactEmail]
                        ])
                    ],
                    ['license', new Map([
                            ['name', this.infoLicenseName],
                            ['url', this.infoLicenseUrl]
                        ])
                    ]
                ])
            ],
            ['paths', this.createPathsData()]
        ]);
        this.writeData(0, data);
        //console.log(this.content);
        return this.content;
    }
    createPathsData() {
        let data = new Map();
        for (let command of this.commands) {
            let path = this.baseRoute + "/" + command.getName();
            if (!path.startsWith("/"))
                path = "/" + path;
            data.set(path, new Map([
                ["post", new Map([
                        ["tags", [this.baseRoute]],
                        ["operationId", command.getName()],
                        ["requestBody", this.createRequestBodyData(command)],
                        ["responses", this.createResponsesData()]
                    ])
                ]
            ]));
        }
        return data;
    }
    createRequestBodyData(command) {
        let schemaData = this.createSchemaData(command);
        return schemaData == null ? null : new Map([
            ["content", new Map([
                    ["application/json", new Map([
                            ["schema", schemaData]
                        ])
                    ]
                ])
            ]
        ]);
    }
    createSchemaData(command) {
        let schema = command._schema; //command.getSchema();// as ObjectSchema;
        if (schema == null || schema.getProperties() == null)
            return null;
        let properties = new Map();
        let required = [];
        schema.getProperties().forEach(property => {
            properties.set(property.getName(), new Map([
                ["type", this.typeToString(property.getType())]
            ]));
            if (property.isRequired)
                required.push(property.getName());
        });
        let data = new Map([
            ["properties", properties]
        ]);
        if (required.length > 0) {
            data.set("required", required);
        }
        return data;
    }
    createResponsesData() {
        return new Map([
            ["200", new Map([
                    ["description", "Successful response"],
                    ["content", new Map([
                            ["application/json", new Map([
                                    ["schema", new Map([
                                            ["type", "object"]
                                        ])
                                    ]
                                ])
                            ]
                        ])
                    ]
                ])
            ]
        ]);
    }
    writeData(indent, data) {
        data.forEach((value, key) => {
            if (value == null) {
                // Skip...
            }
            else if (typeof value === "string") {
                this.writeAsString(indent, key, value);
            }
            else if (Array.isArray(value)) {
                if (value.length > 0) {
                    this.writeName(indent, key);
                    for (let index = 0; index < value.length; index++) {
                        const item = value[index];
                        this.writeArrayItem(indent + 1, item);
                    }
                }
            }
            else if (typeof value === "object") {
                if (Array.from(value.values()).findIndex((item) => { return item != null; }) >= 0) {
                    this.writeName(indent, key);
                    this.writeData(indent + 1, value);
                }
            }
            else {
                this.writeAsObject(indent, key, value);
            }
        });
    }
    writeName(indent, name) {
        let spaces = this.getSpaces(indent);
        this.content += spaces + name + ":\n";
    }
    writeArrayItem(indent, name, isObjectItem = false) {
        let spaces = this.getSpaces(indent);
        this.content += spaces + "- ";
        if (isObjectItem)
            this.content += name + ":\n";
        else
            this.content += name + "\n";
    }
    writeAsObject(indent, name, value) {
        if (value == null)
            return;
        var spaces = this.getSpaces(indent);
        this.content += spaces + name + ": " + value + "\n";
    }
    writeAsString(indent, name, value) {
        if (value == null)
            return;
        let spaces = this.getSpaces(indent);
        this.content += spaces + name + ": '" + value + "'\n";
    }
    getSpaces(length) {
        return ' '.repeat(length * 2);
    }
    typeToString(type) {
        // allowed types: array, boolean, integer, number, object, string
        if (type == pip_services3_commons_nodex_2.TypeCode.Integer || type == pip_services3_commons_nodex_2.TypeCode.Long)
            return 'integer';
        if (type == pip_services3_commons_nodex_2.TypeCode.Double || type == pip_services3_commons_nodex_2.TypeCode.Float)
            return 'number';
        if (type == pip_services3_commons_nodex_2.TypeCode.String)
            return 'string';
        if (type == pip_services3_commons_nodex_2.TypeCode.Boolean)
            return 'boolean';
        if (type == pip_services3_commons_nodex_2.TypeCode.Array)
            return 'array';
        return 'object';
    }
}
exports.CommandableSwaggerDocument = CommandableSwaggerDocument;
//# sourceMappingURL=CommandableSwaggerDocument.js.map