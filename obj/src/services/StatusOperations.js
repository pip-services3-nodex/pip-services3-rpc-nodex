"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusOperations = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const RestOperations_1 = require("./RestOperations");
class StatusOperations extends RestOperations_1.RestOperations {
    constructor() {
        super();
        this._startTime = new Date();
        this._dependencyResolver.put("context-info", new pip_services3_commons_nodex_1.Descriptor("pip-services", "context-info", "default", "*", "1.0"));
    }
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references) {
        this._references2 = references;
        super.setReferences(references);
        this._contextInfo = this._dependencyResolver.getOneOptional("context-info");
    }
    getStatusOperation() {
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
    status(req, res) {
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
        let status = {
            id: id,
            name: name,
            description: description,
            start_time: pip_services3_commons_nodex_2.StringConverter.toString(this._startTime),
            current_time: pip_services3_commons_nodex_2.StringConverter.toString(new Date()),
            uptime: uptime,
            properties: properties,
            components: components
        };
        this.sendResult(req, res, status);
    }
}
exports.StatusOperations = StatusOperations;
//# sourceMappingURL=StatusOperations.js.map