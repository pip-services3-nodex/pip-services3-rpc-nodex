const assert = require('chai').assert;
const restify = require('restify-clients');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { Dummy } from '../Dummy';
import { DummyController } from '../DummyController';
import { DummyCommandableHttpService } from './DummyCommandableHttpService';

// import * as fs from 'fs';

suite('DummyCommandableHttpService', () => {
    let _dummy1: Dummy;
    let _dummy2: Dummy;

    let headers: any = {};
    let service: DummyCommandableHttpService;
    let rest: any;

    let restConfig = ConfigParams.fromTuples(
        "connection.protocol", "http",
        "connection.host", "localhost",
        "connection.port", 3000,
        "swagger.enable", "true"
    );

    suiteSetup(async () => {
        let ctrl = new DummyController();

        service = new DummyCommandableHttpService();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl,
            new Descriptor('pip-services-dummies', 'service', 'http', 'default', '1.0'), service
        );
        service.setReferences(references);

        await service.open(null);
    });

    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*', headers: headers });

        _dummy1 = { id: null, key: "Key 1", content: "Content 1", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
        _dummy2 = { id: null, key: "Key 2", content: "Content 2", array: [{ key: "SubKey 1", content: "SubContent 1" }] };
    });

    test('CRUD Operations', async () => {

        // Create one dummy
        let dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/create_dummy',
                {
                    dummy: _dummy1
                },
                (err, req, res, dummy) => {
                    if (err == null) resolve(dummy);
                    else reject(err);
                }
            );
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, _dummy1.content);
        assert.equal(dummy.key, _dummy1.key);

        let dummy1 = dummy;

        // Create another dummy
        dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/create_dummy',
                {
                    dummy: _dummy2
                },
                (err, req, res, dummy) => {
                    if (err == null) resolve(dummy);
                    else reject(err);
                }
            );
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, _dummy2.content);
        assert.equal(dummy.key, _dummy2.key);

        let dummy2 = dummy;

        // Get all dummies
        let dummies = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/get_dummies',
                null,
                (err, req, res, dummies) => {
                    if (err == null) resolve(dummies);
                    else reject(err);
                }
            );
        });
        assert.isObject(dummies);
        assert.lengthOf(dummies.data, 2);

        // Update the dummy
        dummy1.content = 'Updated Content 1';
        dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/update_dummy',
                {
                    dummy: dummy1
                },
                (err, req, res, dummy) => {
                    if (err == null) resolve(dummy);
                    else reject(err);
                }
            );
        });
        assert.isObject(dummy);
        assert.equal(dummy.content, 'Updated Content 1');
        assert.equal(dummy.key, _dummy1.key);

        dummy1 = dummy;

        // Get the dummy by id
        dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/get_dummy_by_id',
                {
                    dummy_id: dummy1.id
                },
                (err, req, res, dummy) => {
                    if (err == null) resolve(dummy);
                    else reject(err);
                }
            );
        });

        // Delete dummy
        dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/delete_dummy',
                {
                    dummy_id: dummy1.id
                },
                (err, req, res, dummy) => {
                    if (err == null) resolve(dummy);
                    else reject(err);
                }
            );
        });

        // Try to get delete dummy
        dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/get_dummy_by_id',
                {
                    dummy_id: dummy1.id
                },
                (err, req, res, dummy) => {
                    if (err == null) resolve(dummy);
                    else reject(err);
                }
            );
        });
        // assert.isObject(dummy);
    });

    test('Failed Validation', async () => {

        // Create one dummy with an invalid id
        let dummy = await new Promise<any>((resolve, reject) => {
            rest.post('/dummy/create_dummy',
                {
                },
                (err, req, res, dummy) => {
                    assert.equal(err.restCode, 'INVALID_DATA');

                    if (err != null) resolve(err);
                    else reject(dummy);
                }
            );
        });
    });

    test('Check correlationId', async () => {
        // check transmit correllationId over params
        let result = await new Promise<any>((resolve, reject) => {
            rest.post("/dummy/check_correlation_id?correlation_id=test_cor_id",
                null,
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });
        assert.equal("test_cor_id", result["correlation_id"]);

        // check transmit correllationId over header
        headers["correlation_id"] = "test_cor_id_header"
        result = await new Promise<any>((resolve, reject) => {
            rest.post("/dummy/check_correlation_id",
                null,
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });
        assert.equal("test_cor_id_header", result["correlation_id"]);
    });

    test('Get OpenApi Spec', async () => {
        let url = 'http://localhost:3000';
        let client = restify.createStringClient({ url: url, version: '*' });

        let result = await new Promise<any>((resolve, reject) => {
            client.get("/dummy/swagger",
                (err, req, res) => {
                    resolve(res.body);
                }
            );
        });

        // uncomment and copy to editor.swagger.io for check
        // fs.writeFile('file.txt', result,  function(err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     console.log("File created!");
        // });

        assert.isTrue(result.startsWith("openapi:"));
    });

    test('OpenApi Spec Override', async () => {
        let openApiContent = "swagger yaml content";

        let url = 'http://localhost:3000';
        let client = restify.createStringClient({ url: url, version: '*' });

        // recreate service with new configuration
        await service.close(null);

        let config = restConfig.setDefaults(ConfigParams.fromTuples("swagger.auto", false));

        let ctrl = new DummyController();

        service = new DummyCommandableHttpService();
        service.configure(config);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-dummies', 'controller', 'default', 'default', '1.0'), ctrl,
            new Descriptor('pip-services-dummies', 'service', 'http', 'default', '1.0'), service
        );
        service.setReferences(references);

        await service.open(null);

        let result = await new Promise<any>((resolve, reject) => {
            client.get("/dummy/swagger",
                (err, req, res) => {
                    resolve(res.body);
                }
            );
        });
        assert.equal(openApiContent, result);

        await service.close(null);
    });
});
