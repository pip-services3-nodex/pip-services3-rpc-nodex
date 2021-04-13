/** @module build */
import { Factory } from 'pip-services3-components-nodex';
/**
 * Creates RPC components by their descriptors.
 *
 * @see [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/classes/build.factory.html Factory]]
 * @see [[HttpEndpoint]]
 * @see [[HeartbeatRestService]]
 * @see [[StatusRestService]]
 */
export declare class DefaultRpcFactory extends Factory {
    private static readonly HttpEndpointDescriptor;
    private static readonly StatusServiceDescriptor;
    private static readonly HeartbeatServiceDescriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
