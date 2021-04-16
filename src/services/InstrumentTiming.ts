/** @module services */

import { ILogger } from "pip-services3-components-nodex";
import { ICounters } from "pip-services3-components-nodex";
import { CounterTiming } from "pip-services3-components-nodex";
import { TraceTiming } from "pip-services3-components-nodex";

export class InstrumentTiming {
    private _correlationId: string;
    private _name: string;
    private _verb: string;
    private _logger: ILogger;
    private _counters: ICounters;
    private _counterTiming: CounterTiming;
    private _traceTiming: TraceTiming;

    public constructor(correlationId: string, name: string,
        verb: string, logger: ILogger, counters: ICounters,
        counterTiming: CounterTiming, traceTiming: TraceTiming) {
        this._correlationId = correlationId;
        this._name = name;
        this._verb = verb || "call";
        this._logger = logger;
        this._counters = counters;
        this._counterTiming = counterTiming;
        this._traceTiming = traceTiming;
    }

    private clear(): void {
        // Clear references to avoid double processing
        this._counters = null;
        this._logger = null;
        this._counterTiming = null;
        this._traceTiming = null;
    }

    public endTiming(err?: Error): void {
        if (err == null) {
            this.endSuccess();
        } else {
            this.endFailure(err);
        }
    }

    public endSuccess(): void {
        if (this._counterTiming != null) {
            this._counterTiming.endTiming();
        }
        if (this._traceTiming != null) {
            this._traceTiming.endTrace();
        }

        this.clear();
    }

    public endFailure(err: Error): void {
        if (this._counterTiming != null) {
            this._counterTiming.endTiming();
        }

        if (err != null) {
            if (this._logger != null) {
                this._logger.error(this._correlationId, err, "Failed to call %s method", this._name);
            }
            if (this._counters != null) {
                this._counters.incrementOne(this._name + "." + this._verb + "_errors");    
            }
            if (this._traceTiming != null) {
                this._traceTiming.endFailure(err);
            }    
        } else {
            if (this._traceTiming != null) {
                this._traceTiming.endTrace();
            }    
        }

        this.clear();
    }
}