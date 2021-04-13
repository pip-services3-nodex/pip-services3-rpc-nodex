"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyCommandableHttpService = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const CommandableHttpService_1 = require("../../src/services/CommandableHttpService");
class DummyCommandableHttpService extends CommandableHttpService_1.CommandableHttpService {
    constructor() {
        super('dummy');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'controller', 'default', '*', '*'));
    }
    register() {
        if (!this._swaggerAuto && this._swaggerEnable) {
            this.registerOpenApiSpec("swagger yaml content");
        }
        super.register();
    }
}
exports.DummyCommandableHttpService = DummyCommandableHttpService;
//# sourceMappingURL=DummyCommandableHttpService.js.map