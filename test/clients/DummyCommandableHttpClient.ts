import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { CommandableHttpClient } from '../../src/clients/CommandableHttpClient';
import { IDummyClient } from './IDummyClient';
import { Dummy } from '../Dummy';

export class DummyCommandableHttpClient extends CommandableHttpClient implements IDummyClient {

    public constructor() {
        super('dummy');
    }


    public getDummies(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>> {
        return this.callCommand(
            'get_dummies',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    public getDummyById(correlationId: string, dummyId: string): Promise<Dummy> {
        return this.callCommand(
            'get_dummy_by_id',
            correlationId,
            {
                dummy_id: dummyId
            }
        );
    }

    public createDummy(correlationId: string, dummy: any): Promise<Dummy> {
        return this.callCommand(
            'create_dummy',
            correlationId,
            {
                dummy: dummy
            }
        );
    }

    public updateDummy(correlationId: string, dummy: any): Promise<Dummy> {
        return this.callCommand(
            'update_dummy',
            correlationId,
            {
                dummy: dummy
            }
        );
    }

    public deleteDummy(correlationId: string, dummyId: string): Promise<Dummy> {
        return this.callCommand(
            'delete_dummy',
            correlationId,
            {
                dummy_id: dummyId
            }
        );
    }

    public async checkCorrelationId(correlationId: string): Promise<string> {
        let result = await this.callCommand<any>(
            'check_correlation_id',
            correlationId,
            null
        );
        return result != null ? result.correlation_id : null;
    }

}
