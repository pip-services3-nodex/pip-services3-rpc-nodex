/** @module build */
import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { HttpEndpoint } from '../services/HttpEndpoint';
import { HeartbeatRestService } from '../services/HeartbeatRestService';
import { StatusRestService } from '../services/StatusRestService';

/**
 * Creates RPC components by their descriptors.
 * 
 * @see [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/classes/build.factory.html Factory]]
 * @see [[HttpEndpoint]]
 * @see [[HeartbeatRestService]]
 * @see [[StatusRestService]] 
 */
export class DefaultRpcFactory extends Factory {
    private static readonly HttpEndpointDescriptor: Descriptor = new Descriptor("pip-services", "endpoint", "http", "*", "1.0");
    private static readonly StatusServiceDescriptor = new Descriptor("pip-services", "status-service", "http", "*", "1.0");
    private static readonly HeartbeatServiceDescriptor = new Descriptor("pip-services", "heartbeat-service", "http", "*", "1.0");

    /**
	 * Create a new instance of the factory.
	 */
    public constructor() {
        super();
        this.registerAsType(DefaultRpcFactory.HttpEndpointDescriptor, HttpEndpoint);
        this.registerAsType(DefaultRpcFactory.HeartbeatServiceDescriptor, HeartbeatRestService);
        this.registerAsType(DefaultRpcFactory.StatusServiceDescriptor, StatusRestService);
    }
}
