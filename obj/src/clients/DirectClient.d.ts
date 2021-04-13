/** @module clients */
import { IOpenable } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex';
import { CompositeCounters } from 'pip-services3-components-nodex';
import { CompositeTracer } from 'pip-services3-components-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { InstrumentTiming } from '../services/InstrumentTiming';
/**
 * Abstract client that calls controller directly in the same memory space.
 *
 * It is used when multiple microservices are deployed in a single container (monolyth)
 * and communication between them can be done by direct calls rather then through
 * the network.
 *
 * ### Configuration parameters ###
 *
 * - dependencies:
 *   - controller:            override controller descriptor
 *
 * ### References ###
 *
 * - <code>\*:logger:\*:\*:1.0</code>         (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/log.ilogger.html ILogger]] components to pass log messages
 * - <code>\*:counters:\*:\*:1.0</code>       (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/count.icounters.html ICounters]] components to pass collected measurements
 * - <code>\*:tracer:\*:\*:1.0</code>         (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/trace.itracer.html ITracer]] components to record traces
 * - <code>\*:controller:\*:\*:1.0</code>     controller to call business methods
 *
 * ### Example ###
 *
 *     class MyDirectClient extends DirectClient<IMyController> implements IMyClient {
 *
 *         public constructor() {
 *           super();
 *           this._dependencyResolver.put('controller', new Descriptor(
 *               "mygroup", "controller", "*", "*", "*"));
 *         }
 *         ...
 *
 *         public async getData(correlationId: string, id: string): Promise<MyData> {
 *           let timing = this.instrument(correlationId, 'myclient.get_data');
 *           try {
 *             return await this._controller.getData(correlationId, id);
 *           } catch (ex) {
 *             timing.endFailure(ex);
 *           } finally {
 *             timing.endTiming();
 *           }
 *         }
 *         ...
 *     }
 *
 *     let client = new MyDirectClient();
 *     client.setReferences(References.fromTuples(
 *         new Descriptor("mygroup","controller","default","default","1.0"), controller
 *     ));
 *
 *     let result = await client.getData("123", "1");
 */
export declare abstract class DirectClient<T> implements IConfigurable, IReferenceable, IOpenable {
    /**
     * The controller reference.
     */
    protected _controller: T;
    /**
     * The open flag.
     */
    protected _opened: boolean;
    /**
     * The logger.
     */
    protected _logger: CompositeLogger;
    /**
     * The tracer.
     */
    protected _tracer: CompositeTracer;
    /**
    * The performance counters
    */
    protected _counters: CompositeCounters;
    /**
     * The dependency resolver to get controller reference.
     */
    protected _dependencyResolver: DependencyResolver;
    /**
     * Creates a new instance of the client.
     */
    constructor();
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Adds instrumentation to log calls and measure call time.
     * It returns a Timing object that is used to end the time measurement.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param name              a method name.
     * @returns InstrumentTiming object to end the time measurement.
     */
    protected instrument(correlationId: string, name: string): InstrumentTiming;
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen(): boolean;
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    open(correlationId: string): Promise<void>;
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     */
    close(correlationId: string): Promise<void>;
}
