import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { DirectClient } from '../../src/clients/DirectClient';
import { IDummyClient } from './IDummyClient';
import { IDummyController } from '../IDummyController';
import { Dummy } from '../Dummy';

export class DummyDirectClient extends DirectClient<IDummyController> implements IDummyClient {
            
    public constructor() {
        super();

        this._dependencyResolver.put('controller', new Descriptor("pip-services-dummies", "controller", "*", "*", "*"))
    }

    public async getDummies(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>> {
        let timing = this.instrument(correlationId, 'dummy.get_page_by_filter');
        try {
            return await this._controller.getPageByFilter(correlationId, filter, paging);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async getDummyById(correlationId: string, dummyId: string): Promise<Dummy> {
        let timing = this.instrument(correlationId, 'dummy.get_one_by_id');
        try {
            return await this._controller.getOneById(correlationId, dummyId);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async createDummy(correlationId: string, dummy: any): Promise<Dummy> {        
        let timing = this.instrument(correlationId, 'dummy.create');
        try {
            return await this._controller.create(correlationId, dummy);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async updateDummy(correlationId: string, dummy: any): Promise<Dummy> {        
        let timing = this.instrument(correlationId, 'dummy.update');
        try {
            return await this._controller.update(correlationId, dummy);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async deleteDummy(correlationId: string, dummyId: string): Promise<Dummy> {        
        let timing = this.instrument(correlationId, 'dummy.delete_by_id');
        try {
            return await this._controller.deleteById(correlationId, dummyId);
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }

    public async checkCorrelationId(correlationId: string): Promise<string> {
        let timing = this.instrument(correlationId, 'dummy.check_correlation_id');
        try {
            return await this._controller.checkCorrelationId(correlationId); 
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }
  
}
