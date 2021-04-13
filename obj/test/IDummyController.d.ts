import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { Dummy } from './Dummy';
export interface IDummyController {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>>;
    getOneById(correlationId: string, id: string): Promise<Dummy>;
    create(correlationId: string, entity: Dummy): Promise<Dummy>;
    update(correlationId: string, entity: Dummy): Promise<Dummy>;
    deleteById(correlationId: string, id: string): Promise<Dummy>;
    checkCorrelationId(correlationId: string): Promise<string>;
}
