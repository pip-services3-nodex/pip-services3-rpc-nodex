/** @module clients */
import { RestClient } from './RestClient';

/**
 * Abstract client that calls commandable HTTP service.
 * 
 * Commandable services are generated automatically for [[https://pip-services3-nodex.github.io/pip-services3-commons-nodex/interfaces/commands.icommandable.html ICommandable objects]].
 * Each command is exposed as POST operation that receives all parameters
 * in body object.
 * 
 * ### Configuration parameters ###
 * 
 * base_route:              base route for remote URI
 * 
 * - connection(s):           
 *   - discovery_key:         (optional) a key to retrieve the connection from [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]]
 *   - protocol:              connection protocol: http or https
 *   - host:                  host name or IP address
 *   - port:                  port number
 *   - uri:                   resource URI or connection string with all parameters in it
 * - options:
 *   - retries:               number of retries (default: 3)
 *   - connect_timeout:       connection timeout in milliseconds (default: 10 sec)
 *   - timeout:               invocation timeout in milliseconds (default: 10 sec)
 * 
 * ### References ###
 * 
 * - <code>\*:logger:\*:\*:1.0</code>         (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/log.ilogger.html ILogger]] components to pass log messages
 * - <code>\*:counters:\*:\*:1.0</code>         (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/count.icounters.html ICounters]] components to pass collected measurements
 * - <code>\*:traces:\*:\*:1.0</code>         (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/trace.itracer.html ITracer]] components to record traces
 * - <code>\*:discovery:\*:\*:1.0</code>        (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]] services to resolve connection
 * 
 * ### Example ###
 * 
 *     class MyCommandableHttpClient extends CommandableHttpClient implements IMyClient {
 *        ...
 * 
 *         public async getData(correlationId: string, id: string): Promise<MyData> {
 *            return await this.callCommand(
 *                "get_data",
 *                correlationId,
 *                { id: id }
 *            );        
 *         }
 *         ...
 *     }
 * 
 *     let client = new MyCommandableHttpClient();
 *     client.configure(ConfigParams.fromTuples(
 *         "connection.protocol", "http",
 *         "connection.host", "localhost",
 *         "connection.port", 8080
 *     ));
 * 
 *     let result = await client.getData("123", "1");
 *     ...
 */
export abstract class CommandableHttpClient extends RestClient {
    /**
     * Creates a new instance of the client.
     * 
     * @param baseRoute     a base route for remote service. 
     */
    public constructor(baseRoute: string) {
        super();
        this._baseRoute = baseRoute;
    }

    /**
     * Calls a remote method via HTTP commadable protocol.
     * The call is made via POST operation and all parameters are sent in body object.
     * The complete route to remote method is defined as baseRoute + "/" + name.
     * 
     * @param name              a name of the command to call. 
     * @param correlationId     (optional) transaction id to trace execution through the call chain.
     * @param params            command parameters.
     * @returns                 a command execution result.
     */
    protected async callCommand<T>(name: string, correlationId: string, params: any): Promise<T> {
        let timing = this.instrument(correlationId, this._baseRoute + '.' + name);
        try {
            return await this.call<T>('post', name, correlationId, {}, params || {});
        } catch (ex) {
            timing.endFailure(ex);
        } finally {
            timing.endTiming();
        }
    }
}