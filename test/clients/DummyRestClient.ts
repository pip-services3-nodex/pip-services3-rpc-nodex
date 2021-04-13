import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { RestClient } from '../../src/clients/RestClient';
import { IDummyClient } from './IDummyClient';
import { Dummy } from '../Dummy';

export class DummyRestClient extends RestClient implements IDummyClient {
        
    public async getDummies(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>> {
        let params = {};
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);

        let timing = this.instrument(correlationId, 'dummy.get_page_by_filter');
        try {
            return await this.call('get', '/dummies', correlationId, params);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async getDummyById(correlationId: string, dummyId: string): Promise<Dummy> {
        let timing = this.instrument(correlationId, 'dummy.get_one_by_id');
        try {
            return await this.call('get', '/dummies/' + dummyId, correlationId, {}); 
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async createDummy(correlationId: string, dummy: any): Promise<Dummy> {
        let timing = this.instrument(correlationId, 'dummy.create');
        try {
            return await this.call('post', '/dummies', correlationId, {}, dummy);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async updateDummy(correlationId: string, dummy: any): Promise<Dummy> {
        let timing = this.instrument(correlationId, 'dummy.update');
        try {
            return await this.call('put', '/dummies', correlationId, {}, dummy);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async deleteDummy(correlationId: string, dummyId: string): Promise<Dummy> {
        let timing = this.instrument(correlationId, 'dummy.delete_by_id');
        try {
            return await this.call('delete', '/dummies/' + dummyId, correlationId, {});
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async checkCorrelationId(correlationId: string): Promise<string> {
        let timing = this.instrument(correlationId, 'dummy.check_correlation_id');
        try {
            let result = await this.call<any>('get', '/dummies/check/correlation_id', correlationId, {});
            return result != null ? result.correlation_id : null;
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }
  
}
