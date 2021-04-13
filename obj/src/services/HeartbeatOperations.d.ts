/** @module services */
import { RestOperations } from './RestOperations';
export declare class HeartbeatOperations extends RestOperations {
    constructor();
    getHeartbeatOperation(): (req: any, res: any) => void;
    heartbeat(req: any, res: any): void;
}
