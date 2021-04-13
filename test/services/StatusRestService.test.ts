const assert = require('chai').assert;
const restify = require('restify-clients');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ContextInfo } from 'pip-services3-components-nodex';

import { StatusRestService } from '../../src/services/StatusRestService';

var restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('StatusRestService', ()=> {
    let service: StatusRestService;
    let rest: any;

    suiteSetup(async () => {
        service = new StatusRestService();
        service.configure(restConfig);

        let contextInfo = new ContextInfo();
        contextInfo.name = "Test";
        contextInfo.description = "This is a test container";

        let references = References.fromTuples(
            new Descriptor("pip-services", "context-info", "default", "default", "1.0"), contextInfo,
            new Descriptor("pip-services", "status-service", "http", "default", "1.0"), service
        );
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Status', async () => {
        let result = await new Promise((resolve, reject) => {
            rest.get('/status', (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.isNotNull(result);
    });

});
