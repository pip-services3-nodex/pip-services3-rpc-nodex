/** @module services */
import { RestOperations } from './RestOperations';

export class HeartbeatOperations extends RestOperations {
    public constructor() {
        super();
    }

    public getHeartbeatOperation() {
        return (req, res) => {
            this.heartbeat(req, res);
        };
    }

    public heartbeat(req, res): void {
        this.sendResult(req, res, new Date());
    }
}