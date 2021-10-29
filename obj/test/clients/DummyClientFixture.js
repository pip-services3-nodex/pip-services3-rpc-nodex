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
exports.DummyClientFixture = void 0;
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class DummyClientFixture {
    constructor(client) {
        this._client = client;
    }
    testCrudOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            let dummy1 = { id: null, key: "Key 1", content: "Content 1", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
            let dummy2 = { id: null, key: "Key 2", content: "Content 2", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
            // Create one dummy
            let dummy = yield this._client.createDummy(null, dummy1);
            assert.isObject(dummy);
            assert.equal(dummy.content, dummy1.content);
            assert.equal(dummy.key, dummy1.key);
            dummy1 = dummy;
            // Create another dummy
            dummy = yield this._client.createDummy(null, dummy2);
            assert.isObject(dummy);
            assert.equal(dummy.content, dummy2.content);
            assert.equal(dummy.key, dummy2.key);
            dummy2 = dummy;
            // Get all dummies
            let dummies = yield this._client.getDummies(null, new pip_services3_commons_nodex_1.FilterParams(), new pip_services3_commons_nodex_2.PagingParams(0, 5, false));
            assert.isObject(dummies);
            assert.isTrue(dummies.data.length >= 2);
            // Update the dummy
            dummy1.content = 'Updated Content 1';
            dummy = yield this._client.updateDummy(null, dummy1);
            assert.isObject(dummy);
            assert.equal(dummy.content, 'Updated Content 1');
            assert.equal(dummy.key, dummy1.key);
            dummy1 = dummy;
            // Delete dummy
            yield this._client.deleteDummy(null, dummy1.id);
            // Try to get delete dummy
            dummy = yield this._client.getDummyById(null, dummy1.id);
            assert.isNull(dummy || null);
            // Check correlation id
            let result = yield this._client.checkCorrelationId("test_cor_id");
            assert.isNotNull(result);
            assert.equal("test_cor_id", result);
        });
    }
}
exports.DummyClientFixture = DummyClientFixture;
//# sourceMappingURL=DummyClientFixture.js.map