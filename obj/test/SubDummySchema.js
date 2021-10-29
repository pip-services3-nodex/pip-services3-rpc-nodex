"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubDummySchema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SubDummySchema extends pip_services3_commons_nodex_2.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty("key", pip_services3_commons_nodex_1.TypeCode.String);
        this.withOptionalProperty("content", pip_services3_commons_nodex_1.TypeCode.String);
    }
}
exports.SubDummySchema = SubDummySchema;
//# sourceMappingURL=SubDummySchema.js.map