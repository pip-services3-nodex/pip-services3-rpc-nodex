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
const assert = require('chai').assert;
const restify = require('restify-clients');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const HttpEndpoint_1 = require("../../src/services/HttpEndpoint");
const DummyController_1 = require("../DummyController");
const DummyRestService_1 = require("./DummyRestService");
let restConfig = pip_services3_commons_nodex_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('HttpEndpoint', () => {
    let _dummy1;
    let _dummy2;
    let endpoint;
    let service;
    let rest;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let ctrl = new DummyController_1.DummyController();
        service = new DummyRestService_1.DummyRestService();
        service.configure(pip_services3_commons_nodex_2.ConfigParams.fromTuples('base_route', '/api/v1'));
        endpoint = new HttpEndpoint_1.HttpEndpoint();
        endpoint.configure(restConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl, new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'service', 'rest', 'default', '1.0'), service, new pip_services3_commons_nodex_1.Descriptor('pip-services', 'endpoint', 'http', 'default', '1.0'), endpoint);
        service.setReferences(references);
        yield endpoint.open(null);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
        yield endpoint.close(null);
    }));
    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        _dummy1 = { id: null, key: "Key 1", content: "Content 1", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
        _dummy2 = { id: null, key: "Key 2", content: "Content 2", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
    });
    test('CRUD Operations', (done) => {
        rest.get('/api/v1/dummies', (err, req, res, dummies) => {
            assert.isNull(err);
            assert.isObject(dummies);
            assert.lengthOf(dummies.data, 0);
            done();
        });
    });
});
//# sourceMappingURL=HttpEndpoint.test.js.map