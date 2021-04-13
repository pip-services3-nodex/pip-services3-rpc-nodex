import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IDummyController } from './IDummyController';
import { Dummy } from './Dummy';
export declare class DummyController implements IDummyController, ICommandable {
    private _commandSet;
    private readonly _entities;
    getCommandSet(): CommandSet;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Dummy>>;
    getOneById(correlationId: string, id: string): Promise<Dummy>;
    create(correlationId: string, entity: Dummy): Promise<Dummy>;
    update(correlationId: string, newEntity: Dummy): Promise<Dummy>;
    deleteById(correlationId: string, id: string): Promise<Dummy>;
    checkCorrelationId(correlationId: string): Promise<string>;
}
