import { IReferences } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';

import { DummySchema } from '../DummySchema';
import { RestService } from '../../src/services/RestService';
import { IDummyController } from '../IDummyController';

export class DummyRestService extends RestService {
    private _controller: IDummyController;
    private _numberOfCalls: number = 0;
    private _swaggerContent: string;
    private _swaggerPath: string;

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-dummies", "controller", "default", "*", "*"));
    }

    public configure(config: ConfigParams): void {
        super.configure(config);

        this._swaggerContent = config.getAsNullableString("swagger.content");
        this._swaggerPath = config.getAsNullableString("swagger.path");
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IDummyController>('controller');
    }
    
    public getNumberOfCalls(): number {
        return this._numberOfCalls;
    }

    private incrementNumberOfCalls(req: any, res: any, next: () => void) {
        this._numberOfCalls++;
        next();
    }

    private getPageByFilter(req: any, res: any) {
        let promise = this._controller.getPageByFilter(
            this.getCorrelationId(req),
            new FilterParams(req.params),
            new PagingParams(req.params)
        );
        this.sendResult(req, res, promise);
    }

    private getOneById(req, res) {
        let promise = this._controller.getOneById(
            this.getCorrelationId(req),
            req.params.dummy_id
        );
        this.sendResult(req, res, promise);
    }

    private create(req, res) {
        let promise = this._controller.create(
            this.getCorrelationId(req),
            req.body
        );
        this.sendCreatedResult(req, res, promise);
    }

    private update(req, res) {
        let promise = this._controller.update(
            this.getCorrelationId(req),
            req.body
        );
        this.sendResult(req, res, promise)
    }

    private deleteById(req, res) {
        let promise = this._controller.deleteById(
            this.getCorrelationId(req),
            req.params.dummy_id,
        );
        this.sendDeletedResult(req, res, promise);
    }    

    private async checkCorrelationId(req, res) {
        try {
            let result = await this._controller.checkCorrelationId(this.getCorrelationId(req));
            this.sendResult(req, res, { correlation_id: result });
        } catch (ex) {
            this.sendError(req, res, ex);
        }
    }
        
    public register() {
        this.registerInterceptor('/dummies', this.incrementNumberOfCalls);

        this.registerRoute(
            'get', '/dummies', 
            new ObjectSchema(true)
                .withOptionalProperty("skip", TypeCode.String)
                .withOptionalProperty("take", TypeCode.String)
                .withOptionalProperty("total", TypeCode.String)
                .withOptionalProperty("body", new FilterParamsSchema()),
            this.getPageByFilter
        );

        this.registerRoute(
            "get", "/dummies/check/correlation_id",
            new ObjectSchema(true),
            this.checkCorrelationId,
        )

        this.registerRoute(
            'get', '/dummies/:dummy_id', 
            new ObjectSchema(true)
                .withRequiredProperty("dummy_id", TypeCode.String),
            this.getOneById
        );

        this.registerRoute(
            'post', '/dummies', 
            new ObjectSchema(true)
                .withRequiredProperty("body", new DummySchema()),
            this.create
        );

        this.registerRoute(
            'put', '/dummies', 
            new ObjectSchema(true)
                .withRequiredProperty("body", new DummySchema()),
            this.update
        );

        this.registerRoute(
            'delete', '/dummies/:dummy_id', 
            new ObjectSchema(true)
                .withRequiredProperty("dummy_id", TypeCode.String),
            this.deleteById
        );

		if (this._swaggerContent) {
            this.registerOpenApiSpec(this._swaggerContent);
        }

        if (this._swaggerPath) {
            this.registerOpenApiSpecFromFile(this._swaggerPath);
        }
    }
}
