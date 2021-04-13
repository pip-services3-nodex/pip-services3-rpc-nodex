"use strict";
/** @module services */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentTiming = void 0;
class InstrumentTiming {
    constructor(correlationId, name, verb, logger, counters, counterTiming, traceTiming) {
        this._correlationId = correlationId;
        this._name = name;
        this._verb = verb || "call";
        this._logger = logger;
        this._counters = counters;
        this._counterTiming = counterTiming;
        this._traceTiming = traceTiming;
    }
    clear() {
        // Clear references to avoid double processing
        this._counters = null;
        this._logger = null;
        this._counterTiming = null;
        this._traceTiming = null;
    }
    endTiming() {
        if (this._counterTiming != null) {
            this._counterTiming.endTiming();
        }
        if (this._traceTiming != null) {
            this._traceTiming.endTrace();
        }
        this.clear();
    }
    endFailure(err) {
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
        }
        else {
            if (this._traceTiming != null) {
                this._traceTiming.endTrace();
            }
        }
        this.clear();
    }
}
exports.InstrumentTiming = InstrumentTiming;
//# sourceMappingURL=InstrumentTiming.js.map