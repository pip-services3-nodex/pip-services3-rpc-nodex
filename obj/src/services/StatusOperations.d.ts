import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from './RestOperations';
export declare class StatusOperations extends RestOperations {
    private _startTime;
    private _references2;
    private _contextInfo;
    constructor();
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    getStatusOperation(): (req: any, res: any) => void;
    /**
     * Handles status requests
     *
     * @param req   an HTTP request
     * @param res   an HTTP response
     */
    status(req: any, res: any): void;
}
