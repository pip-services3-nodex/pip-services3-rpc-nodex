import { IOpenable } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { Schema } from 'pip-services3-commons-nodex';
import { IRegisterable } from './IRegisterable';
/**
 * Used for creating HTTP endpoints. An endpoint is a URL, at which a given service can be accessed by a client.
 *
 * ### Configuration parameters ###
 *
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - connection(s) - the connection resolver's connections:
 *     - "connection.discovery_key" - the key to use for connection resolving in a discovery service;
 *     - "connection.protocol" - the connection's protocol;
 *     - "connection.host" - the target host;
 *     - "connection.port" - the target port;
 *     - "connection.uri" - the target URI.
 * - credential - the HTTPS credentials:
 *     - "credential.ssl_key_file" - the SSL private key in PEM
 *     - "credential.ssl_crt_file" - the SSL certificate in PEM
 *     - "credential.ssl_ca_file" - the certificate authorities (root cerfiticates) in PEM
 *
 * ### References ###
 *
 * A logger, counters, and a connection resolver can be referenced by passing the
 * following references to the object's [[setReferences]] method:
 *
 * - logger: <code>"\*:logger:\*:\*:1.0"</code>;
 * - counters: <code>"\*:counters:\*:\*:1.0"</code>;
 * - discovery: <code>"\*:discovery:\*:\*:1.0"</code> (for the connection resolver).
 *
 * ### Examples ###
 *
 *     public MyMethod(_config: ConfigParams, _references: IReferences) {
 *         let endpoint = new HttpEndpoint();
 *         if (this._config)
 *             endpoint.configure(this._config);
 *         if (this._references)
 *             endpoint.setReferences(this._references);
 *         ...
 *
 *         await this._endpoint.open(correlationId);
 *         this._opened = true;
 *         ...
 *     }
 */
export declare class HttpEndpoint implements IOpenable, IConfigurable, IReferenceable {
    private static readonly _defaultConfig;
    private _server;
    private _connectionResolver;
    private _logger;
    private _counters;
    private _maintenanceEnabled;
    private _fileMaxSize;
    private _protocolUpgradeEnabled;
    private _uri;
    private _registrations;
    /**
     * Configures this HttpEndpoint using the given configuration parameters.
     *
     * __Configuration parameters:__
     * - __connection(s)__ - the connection resolver's connections;
     *     - "connection.discovery_key" - the key to use for connection resolving in a discovery service;
     *     - "connection.protocol" - the connection's protocol;
     *     - "connection.host" - the target host;
     *     - "connection.port" - the target port;
     *     - "connection.uri" - the target URI.
     *     - "credential.ssl_key_file" - SSL private key in PEM
     *     - "credential.ssl_crt_file" - SSL certificate in PEM
     *     - "credential.ssl_ca_file" - Certificate authority (root certificate) in PEM
     *
     * @param config    configuration parameters, containing a "connection(s)" section.
     *
     * @see [[https://pip-services3-nodex.github.io/pip-services3-commons-nodex/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to this endpoint's logger, counters, and connection resolver.
     *
     * __References:__
     * - logger: <code>"\*:logger:\*:\*:1.0"</code>
     * - counters: <code>"\*:counters:\*:\*:1.0"</code>
     * - discovery: <code>"\*:discovery:\*:\*:1.0"</code> (for the connection resolver)
     *
     * @param references    an IReferences object, containing references to a logger, counters,
     *                      and a connection resolver.
     *
     * @see [[https://pip-services3-nodex.github.io/pip-services3-commons-nodex/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    setReferences(references: IReferences): void;
    /**
     * Gets an HTTP server instance.
     * @returns an HTTP server instance of <code>null</code> if endpoint is closed.
     */
    getServer(): any;
    /**
     * @returns whether or not this endpoint is open with an actively listening REST server.
     */
    isOpen(): boolean;
    /**
     * Opens a connection using the parameters resolved by the referenced connection
     * resolver and creates a REST server (service) using the set options and parameters.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     */
    open(correlationId: string): Promise<void>;
    private addCompatibility;
    private noCache;
    private doMaintenance;
    /**
     * Closes this endpoint and the REST server (service) that was opened earlier.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     */
    close(correlationId: string): Promise<void>;
    /**
     * Registers a registerable object for dynamic endpoint discovery.
     *
     * @param registration      the registration to add.
     *
     * @see [[IRegisterable]]
     */
    register(registration: IRegisterable): void;
    /**
     * Unregisters a registerable object, so that it is no longer used in dynamic
     * endpoint discovery.
     *
     * @param registration      the registration to remove.
     *
     * @see [[IRegisterable]]
     */
    unregister(registration: IRegisterable): void;
    private performRegistrations;
    private fixRoute;
    /**
     * Returns correlationId from request
     * @param req -  http request
     * @return Returns correlationId from request
     */
    getCorrelationId(req: any): string;
    /**
     * Registers an action in this objects REST server (service) by the given method and route.
     *
     * @param method        the HTTP method of the route.
     * @param route         the route to register in this object's REST server (service).
     * @param schema        the schema to use for parameter validation.
     * @param action        the action to perform at the given route.
     */
    registerRoute(method: string, route: string, schema: Schema, action: (req: any, res: any) => void): void;
    /**
     * Registers an action with authorization in this objects REST server (service)
     * by the given method and route.
     *
     * @param method        the HTTP method of the route.
     * @param route         the route to register in this object's REST server (service).
     * @param schema        the schema to use for parameter validation.
     * @param authorize     the authorization interceptor
     * @param action        the action to perform at the given route.
     */
    registerRouteWithAuth(method: string, route: string, schema: Schema, authorize: (req: any, res: any, next: () => void) => void, action: (req: any, res: any) => void): void;
    /**
     * Registers a middleware action for the given route.
     *
     * @param route         the route to register in this object's REST server (service).
     * @param action        the middleware action to perform at the given route.
     */
    registerInterceptor(route: string, action: (req: any, res: any, next: () => void) => void): void;
}
