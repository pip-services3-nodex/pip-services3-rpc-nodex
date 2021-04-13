/** @module services */
import { IConfigurable } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex';
import { CompositeCounters } from 'pip-services3-components-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
export declare abstract class RestOperations implements IConfigurable, IReferenceable {
    protected _logger: CompositeLogger;
    protected _counters: CompositeCounters;
    protected _dependencyResolver: DependencyResolver;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    protected getCorrelationId(req: any): any;
    protected getFilterParams(req: any): FilterParams;
    protected getPagingParams(req: any): PagingParams;
    protected sendResult(req: any, res: any, result: any): void;
    protected sendEmptyResult(req: any, res: any): void;
    protected sendCreatedResult(req: any, res: any, result: any): void;
    protected sendDeletedResult(req: any, res: any, result: any): void;
    protected sendError(req: any, res: any, error: any): void;
    protected sendBadRequest(req: any, res: any, message: string): void;
    protected sendUnauthorized(req: any, res: any, message: string): void;
    protected sendNotFound(req: any, res: any, message: string): void;
    protected sendConflict(req: any, res: any, message: string): void;
    protected sendSessionExpired(req: any, res: any, message: string): void;
    protected sendInternalError(req: any, res: any, message: string): void;
    protected sendServerUnavailable(req: any, res: any, message: string): void;
    invoke(operation: string): (req: any, res: any) => void;
}
