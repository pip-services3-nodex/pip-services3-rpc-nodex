import { IReferences } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { RestService } from '../../src/services/RestService';
export declare class DummyRestService extends RestService {
    private _controller;
    private _numberOfCalls;
    private _swaggerContent;
    private _swaggerPath;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getNumberOfCalls(): number;
    private incrementNumberOfCalls;
    private getPageByFilter;
    private getOneById;
    private create;
    private update;
    private deleteById;
    private checkCorrelationId;
    register(): void;
}
