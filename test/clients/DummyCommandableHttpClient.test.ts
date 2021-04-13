import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { DummyController } from '../DummyController';
import { DummyCommandableHttpService } from '../services/DummyCommandableHttpService';
import { DummyCommandableHttpClient } from './DummyCommandableHttpClient';
import { DummyClientFixture } from './DummyClientFixture';

suite('DummyCommandableHttpClient', ()=> {
    let service: DummyCommandableHttpService;
    let client: DummyCommandableHttpClient;
    let fixture: DummyClientFixture;

    let restConfig = ConfigParams.fromTuples(
        "connection.protocol", "http",
        "connection.host", "localhost",
        "connection.port", 3000
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

    setup(async () => {
        client = new DummyCommandableHttpClient();
        fixture = new DummyClientFixture(client);

        client.configure(restConfig);
        client.setReferences(new References());

        await client.open(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
