"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummySchema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const SubDummySchema_1 = require("./SubDummySchema");
class DummySchema extends pip_services3_commons_nodex_3.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty("id", pip_services3_commons_nodex_1.TypeCode.String);
        this.withRequiredProperty("key", pip_services3_commons_nodex_1.TypeCode.String);
        this.withOptionalProperty("content", pip_services3_commons_nodex_1.TypeCode.String);
        this.withOptionalProperty("array", new pip_services3_commons_nodex_2.ArraySchema(new SubDummySchema_1.SubDummySchema()));
    }
}
exports.DummySchema = DummySchema;
//# sourceMappingURL=DummySchema.js.map