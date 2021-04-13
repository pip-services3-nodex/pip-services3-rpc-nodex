import { CommandSet } from 'pip-services3-commons-nodex';
import { IDummyController } from './IDummyController';
export declare class DummyCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IDummyController);
    private makeGetPageByFilterCommand;
    private makeGetOneByIdCommand;
    private makeCreateCommand;
    private makeUpdateCommand;
    private makeDeleteByIdCommand;
    private makeCheckCorrelationIdCommand;
}
