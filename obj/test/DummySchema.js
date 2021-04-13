"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummySchema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class DummySchema extends pip_services3_commons_nodex_2.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty("id", pip_services3_commons_nodex_1.TypeCode.String);
        this.withRequiredProperty("key", pip_services3_commons_nodex_1.TypeCode.String);
        this.withOptionalProperty("content", pip_services3_commons_nodex_1.TypeCode.String);
    }
}
exports.DummySchema = DummySchema;
//# sourceMappingURL=DummySchema.js.map