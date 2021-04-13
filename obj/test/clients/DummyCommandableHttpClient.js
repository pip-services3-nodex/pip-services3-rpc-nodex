"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyCommandableHttpClient = void 0;
const CommandableHttpClient_1 = require("../../src/clients/CommandableHttpClient");
class DummyCommandableHttpClient extends CommandableHttpClient_1.CommandableHttpClient {
    constructor() {
        super('dummy');
    }
    getDummies(correlationId, filter, paging) {
        return this.callCommand('get_dummies', correlationId, {
            filter: filter,
            paging: paging
        });
    }
    getDummyById(correlationId, dummyId) {
        return this.callCommand('get_dummy_by_id', correlationId, {
            dummy_id: dummyId
        });
    }
    createDummy(correlationId, dummy) {
        return this.callCommand('create_dummy', correlationId, {
            dummy: dummy
        });
    }
    updateDummy(correlationId, dummy) {
        return this.callCommand('update_dummy', correlationId, {
            dummy: dummy
        });
    }
    deleteDummy(correlationId, dummyId) {
        return this.callCommand('delete_dummy', correlationId, {
            dummy_id: dummyId
        });
    }
    checkCorrelationId(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.callCommand('check_correlation_id', correlationId, null);
            return result != null ? result.correlation_id : null;
        });
    }
}
exports.DummyCommandableHttpClient = DummyCommandableHttpClient;
//# sourceMappingURL=DummyCommandableHttpClient.js.map