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
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const DummyController_1 = require("../DummyController");
const DummyRestService_1 = require("../services/DummyRestService");
const DummyRestClient_1 = require("./DummyRestClient");
const DummyClientFixture_1 = require("./DummyClientFixture");
suite('DummyRestClient', () => {
    let service;
    let client;
    let fixture;
    let restConfig = pip_services3_commons_nodex_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000, "options.correlation_id_place", "headers");
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let ctrl = new DummyController_1.DummyController();
        service = new DummyRestService_1.DummyRestService();
        service.configure(restConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl, new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'service', 'rest', 'default', '1.0'), service);
        service.setReferences(references);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
    }));
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        client = new DummyRestClient_1.DummyRestClient();
        fixture = new DummyClientFixture_1.DummyClientFixture(client);
        client.configure(restConfig);
        client.setReferences(new pip_services3_commons_nodex_3.References());
        yield client.open(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
});
//# sourceMappingURL=DummyRestClient.test.js.map