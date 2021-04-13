import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { DummyController } from '../DummyController';
import { DummyRestService } from '../services/DummyRestService';
import { DummyRestClient } from './DummyRestClient';
import { DummyClientFixture } from './DummyClientFixture';

suite('DummyRestClient', ()=> {
    let service: DummyRestService;
    let client: DummyRestClient;
    let fixture: DummyClientFixture;

    let restConfig = ConfigParams.fromTuples(
        "connection.protocol", "http",
        "connection.host", "localhost",
        "connection.port", 3000,
        "options.correlation_id_place", "headers",
    );
    
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

    setup(async () => {
        client = new DummyRestClient();
        fixture = new DummyClientFixture(client);

        client.configure(restConfig);
        client.setReferences(new References());

        await client.open(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
