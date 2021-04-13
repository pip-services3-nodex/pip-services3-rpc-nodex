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
exports.DummyDirectClient = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const DirectClient_1 = require("../../src/clients/DirectClient");
class DummyDirectClient extends DirectClient_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("pip-services-dummies", "controller", "*", "*", "*"));
    }
    getDummies(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'dummy.get_page_by_filter');
            try {
                return yield this._controller.getPageByFilter(correlationId, filter, paging);
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
                return yield this._controller.getOneById(correlationId, dummyId);
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
                return yield this._controller.create(correlationId, dummy);
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
                return yield this._controller.update(correlationId, dummy);
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
                return yield this._controller.deleteById(correlationId, dummyId);
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
                return yield this._controller.checkCorrelationId(correlationId);
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
exports.DummyDirectClient = DummyDirectClient;
//# sourceMappingURL=DummyDirectClient.js.map