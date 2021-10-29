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
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const DummyController_1 = require("../DummyController");
const DummyClientFixture_1 = require("./DummyClientFixture");
const DummyDirectClient_1 = require("./DummyDirectClient");
suite('DummyDirectClient', () => {
    let _dummy1;
    let _dummy2;
    let client;
    let fixture;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let ctrl = new DummyController_1.DummyController();
        client = new DummyDirectClient_1.DummyDirectClient();
        let references = pip_services3_commons_nodex_2.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl);
        client.setReferences(references);
        fixture = new DummyClientFixture_1.DummyClientFixture(client);
        yield client.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
    }));
    setup(() => {
        _dummy1 = { id: null, key: "Key 1", content: "Content 1", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
        _dummy2 = { id: null, key: "Key 2", content: "Content 2", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
    });
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
});
//# sourceMappingURL=DummyDirectClient.test.js.map