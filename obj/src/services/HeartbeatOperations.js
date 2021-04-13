"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartbeatOperations = void 0;
/** @module services */
const RestOperations_1 = require("./RestOperations");
class HeartbeatOperations extends RestOperations_1.RestOperations {
    constructor() {
        super();
    }
    getHeartbeatOperation() {
        return (req, res) => {
            this.heartbeat(req, res);
        };
    }
    heartbeat(req, res) {
        this.sendResult(req, res, new Date());
    }
}
exports.HeartbeatOperations = HeartbeatOperations;
//# sourceMappingURL=HeartbeatOperations.js.map