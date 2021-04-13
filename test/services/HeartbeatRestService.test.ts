const assert = require('chai').assert;
const restify = require('restify-clients');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { HeartbeatRestService } from '../../src/services/HeartbeatRestService';

let restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('HeartbeatRestService', ()=> {
    let service: HeartbeatRestService;
    let rest: any;

    suiteSetup(async () => {
        service = new HeartbeatRestService();
        service.configure(restConfig);
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
            rest.get('/heartbeat', (err, req, res, result) => {
                if (err == null) resolve(result);
                else reject(err);
            });
        });
        assert.isNotNull(result);
    });

});
