/** @module services */
import { ILogger } from "pip-services3-components-nodex";
import { ICounters } from "pip-services3-components-nodex";
import { CounterTiming } from "pip-services3-components-nodex";
import { TraceTiming } from "pip-services3-components-nodex";
export declare class InstrumentTiming {
    private _correlationId;
    private _name;
    private _verb;
    private _logger;
    private _counters;
    private _counterTiming;
    private _traceTiming;
    constructor(correlationId: string, name: string, verb: string, logger: ILogger, counters: ICounters, counterTiming: CounterTiming, traceTiming: TraceTiming);
    private clear;
    endTiming(): void;
    endFailure(err: Error): void;
}
