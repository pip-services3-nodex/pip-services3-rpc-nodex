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
exports.DummyRestClient = void 0;
const RestClient_1 = require("../../src/clients/RestClient");
class DummyRestClient extends RestClient_1.RestClient {
    getDummies(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            this.addFilterParams(params, filter);
            this.addPagingParams(params, paging);
            let timing = this.instrument(correlationId, 'dummy.get_page_by_filter');
            try {
                return yield this.call('get', '/dummies', correlationId, params);
            }
            catch (ex) {
                timing.endFailure(ex);
            }
            finally {
                timing.endTiming();
            }
        });
    }
    getDummyById(correlationId, dummyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'dummy.get_one_by_id');
            try {
                return yield this.call('get', '/dummies/' + dummyId, correlationId, {});
            }
            catch (ex) {
                timing.endFailure(ex);
            }
            finally {
                timing.endTiming();
            }
        });
    }
    createDummy(correlationId, dummy) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'dummy.create');
            try {
                return yield this.call('post', '/dummies', correlationId, {}, dummy);
            }
            catch (ex) {
                timing.endFailure(ex);
            }
            finally {
                timing.endTiming();
            }
        });
    }
    updateDummy(correlationId, dummy) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'dummy.update');
            try {
                return yield this.call('put', '/dummies', correlationId, {}, dummy);
            }
            catch (ex) {
                timing.endFailure(ex);
            }
            finally {
                timing.endTiming();
            }
        });
    }
    deleteDummy(correlationId, dummyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'dummy.delete_by_id');
            try {
                return yield this.call('delete', '/dummies/' + dummyId, correlationId, {});
            }
            catch (ex) {
                timing.endFailure(ex);
            }
            finally {
                timing.endTiming();
            }
        });
    }
    checkCorrelationId(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'dummy.check_correlation_id');
            try {
                let result = yield this.call('get', '/dummies/check/correlation_id', correlationId, {});
                return result != null ? result.correlation_id : null;
            }
            catch (ex) {
                timing.endFailure(ex);
            }
            finally {
                timing.endTiming();
            }
        });
    }
}
exports.DummyRestClient = DummyRestClient;
//# sourceMappingURL=DummyRestClient.js.map