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
import { BadRequestException } from 'pip-services3-commons-nodex';
import { UnauthorizedException } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { ConflictException } from 'pip-services3-commons-nodex';
import { UnknownException } from 'pip-services3-commons-nodex';
import { HttpResponseSender } from './HttpResponseSender';

export abstract class RestOperations implements IConfigurable, IReferenceable {
    protected _logger = new CompositeLogger();
    protected _counters = new CompositeCounters();
    protected _dependencyResolver = new DependencyResolver();

    public constructor() {}

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);
    }

    protected getCorrelationId(req: any): any {
        let correlationId = req.query.correlation_id;
        if (correlationId == null || correlationId == "") {
            correlationId = req.headers['correlation_id']
        }
        return correlationId
    }

    protected getFilterParams(req: any): FilterParams {
        let value = Object.assign({}, req.query);
        delete value.skip;
        delete value.take;
        delete value.total;
        delete value.correlation_id;

        let filter = FilterParams.fromValue(value);
        return filter;
    }

    protected getPagingParams(req: any): PagingParams {
        let value = {
            skip: req.query.skip,
            take: req.query.take,
            total: req.query.total            
        }        
        let paging = PagingParams.fromValue(value);
        return paging;
    }

    protected sendResult(req: any, res: any, result: any): void {
        return HttpResponseSender.sendResult(req, res, result);
    }

    protected sendEmptyResult(req: any, res: any): void {
        return HttpResponseSender.sendEmptyResult(req, res);
    }

    protected sendCreatedResult(req: any, res: any, result: any): void {
        return HttpResponseSender.sendCreatedResult(req, res, result);
    }

    protected sendDeletedResult(req: any, res: any, result: any): void {
        return HttpResponseSender.sendDeletedResult(req, res, result);
    }

    protected sendError(req: any, res: any, error: any): void {
        HttpResponseSender.sendError(req, res, error);
    }

    protected sendBadRequest(req: any, res: any, message: string): void {
        let correlationId = this.getCorrelationId(req);
        let error = new BadRequestException(correlationId, 'BAD_REQUEST', message);
        this.sendError(req, res, error);
    }

    protected sendUnauthorized(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new UnauthorizedException(correlationId, 'UNAUTHORIZED', message);
        this.sendError(req, res, error);
    }

    protected sendNotFound(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new NotFoundException(correlationId, 'NOT_FOUND', message);
        this.sendError(req, res, error);
    }

    protected sendConflict(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new ConflictException(correlationId, 'CONFLICT', message);
        this.sendError(req, res, error);
    }

    protected sendSessionExpired(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new UnknownException(correlationId, 'SESSION_EXPIRED', message);
        error.status = 440;
        this.sendError(req, res, error);
    }

    protected sendInternalError(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new UnknownException(correlationId, 'INTERNAL', message);
        this.sendError(req, res, error);
    }

    protected sendServerUnavailable(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new ConflictException(correlationId, 'SERVER_UNAVAILABLE', message);
        error.status = 503;
        this.sendError(req, res, error);
    }

    public invoke(operation: string): (req: any, res: any) => void {
        return (req, res) => {
            this[operation](req, res);
        }
    }

}