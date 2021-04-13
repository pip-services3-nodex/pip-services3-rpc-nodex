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
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const StatusRestService_1 = require("../../src/services/StatusRestService");
var restConfig = pip_services3_commons_nodex_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('StatusRestService', () => {
    let service;
    let rest;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        service = new StatusRestService_1.StatusRestService();
        service.configure(restConfig);
        let contextInfo = new pip_services3_components_nodex_1.ContextInfo();
        contextInfo.name = "Test";
        contextInfo.description = "This is a test container";
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor("pip-services", "context-info", "default", "default", "1.0"), contextInfo, new pip_services3_commons_nodex_1.Descriptor("pip-services", "status-service", "http", "default", "1.0"), service);
        service.setReferences(references);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
    }));
    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    test('Status', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield new Promise((resolve, reject) => {
            rest.get('/status', (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        assert.isNotNull(result);
    }));
});
//# sourceMappingURL=StatusRestService.test.js.map