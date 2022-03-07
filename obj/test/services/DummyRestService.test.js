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
const fs = require('fs');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const DummyController_1 = require("../DummyController");
const DummyRestService_1 = require("./DummyRestService");
let restConfig = pip_services3_commons_nodex_3.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000, "swagger.enable", "true", "swagger.content", "swagger yaml or json content" // for test only
);
suite('DummyRestService', () => {
    let _dummy1;
    let _dummy2;
    let headers = {};
    let service;
    let rest;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let ctrl = new DummyController_1.DummyController();
        service = new DummyRestService_1.DummyRestService();
        service.configure(restConfig);
        let references = pip_services3_commons_nodex_4.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl, new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'service', 'rest', 'default', '1.0'), service);
        service.setReferences(references);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
    }));
    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*', headers: headers });
        _dummy1 = { id: null, key: "Key 1", content: "Content 1", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
        _dummy2 = { id: null, key: "Key 2", content: "Content 2", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
    });
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create one dummy
        let dummy = yield new Promise((resolve, reject) => {
            rest.post('/dummies', _dummy1, (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, _dummy1.content);
        assert.equal(dummy.key, _dummy1.key);
        let dummy1 = dummy;
        // Create another dummy
        dummy = yield new Promise((resolve, reject) => {
            rest.post('/dummies', _dummy2, (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, _dummy2.content);
        assert.equal(dummy.key, _dummy2.key);
        let dummy2 = dummy;
        // Get all dummies
        let dummies = yield new Promise((resolve, reject) => {
            rest.get('/dummies', (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.isObject(dummies);
        assert.lengthOf(dummies.data, 2);
        // Update the dummy
        dummy1.content = 'Updated Content 1';
        dummy = yield new Promise((resolve, reject) => {
            rest.put('/dummies', dummy1, (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, 'Updated Content 1');
        assert.equal(dummy.key, _dummy1.key);
        dummy1 = dummy;
        // Delete dummy
        yield new Promise((resolve, reject) => {
            rest.del('/dummies/' + dummy1.id, (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        // Try to get delete dummy
        dummy = yield new Promise((resolve, reject) => {
            rest.get('/dummies/' + dummy1.id, (err, req, res, result) => {
                if (err == null)
                    resolve(result || null);
                else
                    reject(err);
            });
        });
        // assert.isNull(dummy);
    }));
    test('Failed Validation', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create one dummy with an invalid id
        let dummy = yield new Promise((resolve, reject) => {
            rest.post('/dummies', {}, (err, req, res, result) => {
                assert.equal(err.restCode, 'INVALID_DATA');
                if (err != null)
                    resolve(err);
                else
                    reject(dummy);
            });
        });
    }));
    test('Check correlationId', () => __awaiter(void 0, void 0, void 0, function* () {
        // check transmit correllationId over params
        let result = yield new Promise((resolve, reject) => {
            rest.get("/dummies/check/correlation_id?correlation_id=test_cor_id", (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.equal("test_cor_id", result.correlation_id);
        // check transmit correllationId over header
        result = yield new Promise((resolve, reject) => {
            headers["correlation_id"] = "test_cor_id_header";
            rest.get("/dummies/check/correlation_id", (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.equal(service.getNumberOfCalls(), 5); // Check interceptor
        assert.equal("test_cor_id_header", result.correlation_id);
    }));
    test('Get OpenApi Spec From String', () => __awaiter(void 0, void 0, void 0, function* () {
        let client = restify.createStringClient({ url: 'http://localhost:3000', version: '*' });
        let result = yield new Promise((resolve, reject) => {
            rest.get("/swagger", (err, req, res) => {
                // if (err == null) resolve(res.body);
                // else reject(err);
                resolve(res.body);
            });
        });
        let openApiContent = restConfig.getAsString("swagger.content");
        assert.equal(openApiContent, result);
    }));
    test('Get OpenApi Spec From File', () => __awaiter(void 0, void 0, void 0, function* () {
        let openApiContent = "swagger yaml content from file";
        let filename = 'dummy_' + pip_services3_commons_nodex_2.IdGenerator.nextLong() + '.tmp';
        let client = restify.createStringClient({ url: 'http://localhost:3000', version: '*' });
        // create temp file
        yield new Promise((resolve, reject) => {
            fs.writeFile(filename, openApiContent, (err) => {
                if (err == null)
                    resolve(null);
                else
                    reject(err);
            });
        });
        // recreate service with new configuration
        yield service.close(null);
        let serviceConfig = pip_services3_commons_nodex_3.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000, "swagger.enable", "true", "swagger.path", filename // for test only
        );
        let ctrl = new DummyController_1.DummyController();
        service = new DummyRestService_1.DummyRestService();
        service.configure(serviceConfig);
        let references = pip_services3_commons_nodex_4.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl, new pip_services3_commons_nodex_1.Descriptor('pip-services-dummies', 'service', 'rest', 'default', '1.0'), service);
        service.setReferences(references);
        yield service.open(null);
        let content = yield new Promise((resolve, reject) => {
            client.get("/swagger", (err, req, res) => {
                if (err == null)
                    resolve(res.body);
                else
                    reject(err);
            });
        });
        assert.equal(openApiContent, content);
        // delete temp file
        yield new Promise((resolve, reject) => {
            fs.unlink(filename, (err) => {
                if (err == null)
                    resolve(null);
                else
                    reject(err);
            });
        });
    }));
});
//# sourceMappingURL=DummyRestService.test.js.map