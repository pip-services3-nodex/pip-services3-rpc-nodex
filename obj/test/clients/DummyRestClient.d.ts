import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { RestClient } from '../../src/clients/RestClient';
import { IDummyClient } from './IDummyClient';
import { Dummy } from '../Dummy';
export declare class DummyRestClient extends RestClient implements IDummyClient {
    getDummies(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>>;
    getDummyById(correlationId: string, dummyId: string): Promise<Dummy>;
    createDummy(correlationId: string, dummy: any): Promise<Dummy>;
    updateDummy(correlationId: string, dummy: any): Promise<Dummy>;
    deleteDummy(correlationId: string, dummyId: string): Promise<Dummy>;
    checkCorrelationId(correlationId: string): Promise<string>;
}
