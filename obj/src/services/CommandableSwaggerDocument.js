"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandableSwaggerDocument = void 0;
/** @module services */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
// Todo: Refactor to use plan JS objects
class CommandableSwaggerDocument {
    constructor(baseRoute, config, commands) {
        this.content = '';
        this.version = "3.0.2";
        this.infoVersion = "1";
        this.objectType = new Map([
            ['type', 'object']
        ]);
        this.baseRoute = baseRoute;
        this.commands = commands !== null && commands !== void 0 ? commands : [];
        config = config !== null && config !== void 0 ? config : new pip_services3_commons_nodex_2.ConfigParams();
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
        return this.createPropertyData(schema, true);
    }
    createPropertyData(schema, includeRequired) {
        let properties = new Map();
        let required = [];
        schema.getProperties().forEach(property => {
            if (property.getType() == null) {
                properties.set(property.Name, this.objectType);
            }
            else {
                let propertyName = property.getName();
                let propertyType = property.getType();
                if (propertyType instanceof pip_services3_commons_nodex_1.ArraySchema) {
                    properties.set(propertyName, new Map([
                        ["type", "array"],
                        ["items", this.createPropertyTypeData(propertyType.getValueType())]
                    ]));
                }
                else {
                    properties.set(propertyName, this.createPropertyTypeData(propertyType));
                }
                if (includeRequired && property.isRequired)
                    required.push(propertyName);
            }
        });
        let data = new Map([
            ["properties", properties]
        ]);
        if (required.length > 0) {
            data.set("required", required);
        }
        return data;
    }
    createPropertyTypeData(propertyType) {
        if (propertyType instanceof pip_services3_commons_nodex_3.ObjectSchema) {
            let objectMap = this.createPropertyData(propertyType, false);
            return new Map([...Array.from(this.objectType.entries()), ...Array.from(objectMap.entries())]);
        }
        else {
            var typeCode;
            if (propertyType in pip_services3_commons_nodex_5.TypeCode) {
                typeCode = propertyType;
            }
            else {
                typeCode = pip_services3_commons_nodex_4.TypeConverter.toTypeCode(propertyType);
            }
            if (typeCode == pip_services3_commons_nodex_5.TypeCode.Unknown || typeCode == pip_services3_commons_nodex_5.TypeCode.Map) {
                typeCode = pip_services3_commons_nodex_5.TypeCode.Object;
            }
            switch (typeCode) {
                case pip_services3_commons_nodex_5.TypeCode.Integer:
                    return new Map([
                        ["type", "integer"],
                        ["format", "int32"]
                    ]);
                case pip_services3_commons_nodex_5.TypeCode.Long:
                    return new Map([
                        ["type", "number"],
                        ["format", "int64"]
                    ]);
                case pip_services3_commons_nodex_5.TypeCode.Float:
                    return new Map([
                        ["type", "number"],
                        ["format", "float"]
                    ]);
                case pip_services3_commons_nodex_5.TypeCode.Double:
                    return new Map([
                        ["type", "number"],
                        ["format", "double"]
                    ]);
                case pip_services3_commons_nodex_5.TypeCode.DateTime:
                    return new Map([
                        ["type", "string"],
                        ["format", "date-time"]
                    ]);
                default:
                    return new Map([
                        ["type", pip_services3_commons_nodex_4.TypeConverter.toString(typeCode)]
                    ]);
            }
        }
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
}
exports.CommandableSwaggerDocument = CommandableSwaggerDocument;
//# sourceMappingURL=CommandableSwaggerDocument.js.map