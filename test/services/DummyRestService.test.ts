const assert = require('chai').assert;
const restify = require('restify-clients');
const fs = require('fs');

import { Descriptor } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { Dummy } from '../Dummy';
import { DummyController } from '../DummyController';
import { DummyRestService } from './DummyRestService';

let restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000,
    "swagger.enable", "true",
    "swagger.content", "swagger yaml or json content"  // for test only
);

suite('DummyRestService', ()=> {
    let _dummy1: Dummy;
    let _dummy2: Dummy;
    let headers: any = {};

    let service: DummyRestService;

    let rest: any;

    suiteSetup(async () => {
        let ctrl = new DummyController();

        service = new DummyRestService();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl,
            new Descriptor('pip-services-dummies', 'service', 'rest', 'default', '1.0'), service
        );
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*',  headers: headers });

        _dummy1 = { id: null, key: "Key 1", content: "Content 1", array: [ { key: "SubKey 1", content: "SubContent 1"} ]};
        _dummy2 = { id: null, key: "Key 2", content: "Content 2", array: [ { key: "SubKey 1", content: "SubContent 1"} ]};
    });

    test('CRUD Operations', async () => {
        // Create one dummy
        let dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummies', _dummy1, (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, _dummy1.content);
        assert.equal(dummy.key, _dummy1.key);

        let dummy1 = dummy;

        // Create another dummy
        dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummies', _dummy2, (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, _dummy2.content);
        assert.equal(dummy.key, _dummy2.key);

        let dummy2 = dummy;

        // Get all dummies
        let dummies = await new Promise<any>((resolve, reject) => {
            rest.get('/dummies', (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.isObject(dummies);
        assert.lengthOf(dummies.data, 2);

        // Update the dummy
        dummy1.content = 'Updated Content 1';
        dummy = await new Promise<any>((resolve, reject) => {
            rest.put('/dummies', dummy1, (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, 'Updated Content 1');
        assert.equal(dummy.key, _dummy1.key);

        dummy1 = dummy;

        // Delete dummy
        await new Promise<any>((resolve, reject) => {
            rest.del('/dummies/' + dummy1.id, (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });

        // Try to get delete dummy
        dummy = await new Promise<any>((resolve, reject) => {
            rest.get('/dummies/' + dummy1.id, (err, req, res, result) => {
                if (err == null) resolve(result || null);
                else reject(err);
            });
        });
        // assert.isNull(dummy);
    });

    test('Check correlationId', async () => {
        // check transmit correllationId over params
        let result = await new Promise<any>((resolve, reject) => {
            rest.get("/dummies/check/correlation_id?correlation_id=test_cor_id", (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.equal("test_cor_id", result.correlation_id);

        // check transmit correllationId over header
        result = await new Promise<any>((resolve, reject) => {
            headers["correlation_id"] = "test_cor_id_header";
            rest.get("/dummies/check/correlation_id", (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.equal(service.getNumberOfCalls(), 4); // Check interceptor
        assert.equal("test_cor_id_header", result.correlation_id);
    });

    test('Get OpenApi Spec From String', async () => {
        let client = restify.createStringClient({ url: 'http://localhost:3000', version: '*' });

        let result = await new Promise<any>((resolve, reject) => {
            rest.get("/swagger", (err, req, res) => {
                // if (err == null) resolve(res.body);
                // else reject(err);
                resolve(res.body);
            });
        });

        let openApiContent = restConfig.getAsString("swagger.content");
        assert.equal(openApiContent, result);
    });

    test('Get OpenApi Spec From File', async () => {
        let openApiContent = "swagger yaml content from file";
        let filename = 'dummy_'+ IdGenerator.nextLong() + '.tmp';
        let client = restify.createStringClient({ url: 'http://localhost:3000', version: '*' });

        // create temp file
        await new Promise((resolve, reject) => {
            fs.writeFile(filename, openApiContent, (err) => {
                if (err == null) resolve(null);
                else reject(err);
            });
        });

        // recreate service with new configuration
        await service.close(null);

        let serviceConfig = ConfigParams.fromTuples(
            "connection.protocol", "http",
            "connection.host", "localhost",
            "connection.port", 3000,
            "swagger.enable", "true",
            "swagger.path", filename  // for test only
        );

        let ctrl = new DummyController();
        service = new DummyRestService();
        service.configure(serviceConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl,
            new Descriptor('pip-services-dummies', 'service', 'rest', 'default', '1.0'), service
        );
        service.setReferences(references);

        await service.open(null);

        let content = await new Promise((resolve, reject) => {
            client.get("/swagger", (err, req, res) => {
                if (err == null) resolve(res.body);
                else reject(err);
            });
        });
        assert.equal(openApiContent, content);
        
        // delete temp file
        await new Promise((resolve, reject) => {
            fs.unlink(filename, (err) => {
                if (err == null) resolve(null);
                else reject(err);
            });
        });
    });
});
