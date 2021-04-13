/** @module services */
import { ContextInfo } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';

import { RestOperations } from './RestOperations';

export class StatusOperations extends RestOperations {
    private _startTime: Date = new Date();
    private _references2: IReferences;
    private _contextInfo: ContextInfo;

    public constructor() {
        super();
        this._dependencyResolver.put("context-info", new Descriptor("pip-services", "context-info", "default", "*", "1.0"));
    }

    /**
	 * Sets references to dependent components.
	 * 
	 * @param references 	references to locate the component dependencies. 
     */
    public setReferences(references: IReferences): void {
        this._references2 = references;
        super.setReferences(references);

        this._contextInfo = this._dependencyResolver.getOneOptional<ContextInfo>("context-info");
    }

    public getStatusOperation() {
        return (req, res) => {
            this.status(req, res);
        };
    }

    /**
     * Handles status requests
     * 
     * @param req   an HTTP request
     * @param res   an HTTP response
     */
    public status(req, res): void {
        let id = this._contextInfo != null ? this._contextInfo.contextId : "";
        let name = this._contextInfo != null ? this._contextInfo.name : "Unknown";
        let description = this._contextInfo != null ? this._contextInfo.description : "";
        let uptime = new Date().getTime() - this._startTime.getTime();
        let properties = this._contextInfo != null ? this._contextInfo.properties : "";

        let components = [];
        if (this._references2 != null) {
            for (let locator of this._references2.getAllLocators())
                components.push(locator.toString());
        }

        let status =  {
            id: id,
            name: name,
            description: description,
            start_time: StringConverter.toString(this._startTime),
            current_time: StringConverter.toString(new Date()),
            uptime: uptime,
            properties: properties,
            components: components
        };

        this.sendResult(req, res, status);
    }
}