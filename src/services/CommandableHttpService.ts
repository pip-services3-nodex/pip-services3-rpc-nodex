/** @module services */
import { ConfigParams } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';

import { RestService } from './RestService';
import { CommandableSwaggerDocument } from './CommandableSwaggerDocument';

/**
 * Abstract service that receives remove calls via HTTP protocol
 * to operations automatically generated for commands defined in [[https://pip-services3-nodex.github.io/pip-services3-commons-nodex/interfaces/commands.icommandable.html ICommandable components]].
 * Each command is exposed as POST operation that receives all parameters in body object.
 * 
 * Commandable services require only 3 lines of code to implement a robust external
 * HTTP-based remote interface.
 * 
 * ### Configuration parameters ###
 * 
 * - base_route:              base route for remote URI
 * - dependencies:
 *   - endpoint:              override for HTTP Endpoint dependency
 *   - controller:            override for Controller dependency
 * - connection(s):           
 *   - discovery_key:         (optional) a key to retrieve the connection from [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]]
 *   - protocol:              connection protocol: http or https
 *   - host:                  host name or IP address
 *   - port:                  port number
 *   - uri:                   resource URI or connection string with all parameters in it
 * 
 * ### References ###
 * 
 * - <code>\*:logger:\*:\*:1.0</code>               (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/log.ilogger.html ILogger]] components to pass log messages
 * - <code>\*:counters:\*:\*:1.0</code>             (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/count.icounters.html ICounters]] components to pass collected measurements
 * - <code>\*:discovery:\*:\*:1.0</code>            (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]] services to resolve connection
 * - <code>\*:endpoint:http:\*:1.0</code>          (optional) [[HttpEndpoint]] reference
 * 
 * @see [[CommandableHttpClient]]
 * @see [[RestService]]
 * 
 * ### Example ###
 * 
 *     class MyCommandableHttpService extends CommandableHttpService {
 *        public constructor() {
 *           base();
 *           this._dependencyResolver.put(
 *               "controller",
 *               new Descriptor("mygroup","controller","*","*","1.0")
 *           );
 *        }
 *     }
 * 
 *     let service = new MyCommandableHttpService();
 *     service.configure(ConfigParams.fromTuples(
 *         "connection.protocol", "http",
 *         "connection.host", "localhost",
 *         "connection.port", 8080
 *     ));
 *     service.setReferences(References.fromTuples(
 *        new Descriptor("mygroup","controller","default","default","1.0"), controller
 *     ));
 * 
 *     await service.open("123");
 *     console.log("The REST service is running on port 8080");
 */
export abstract class CommandableHttpService extends RestService {
    protected _commandSet: CommandSet;
    protected _swaggerAuto: boolean = true;

    /**
     * Creates a new instance of the service.
     * 
     * @param baseRoute a service base route.
     */
    public constructor(baseRoute: string) {
        super();
        this._baseRoute = baseRoute;
        this._dependencyResolver.put('controller', 'none');
    }

    /**
     * Configures component by passing configuration parameters.
     * 
     * @param config    configuration parameters to be set.
     */
    public configure(config: ConfigParams): void {
        super.configure(config);

        this._swaggerAuto = config.getAsBooleanWithDefault("swagger.auto", this._swaggerAuto);
    }

    /**
     * Registers all service routes in HTTP endpoint.
     */
    public register(): void {
        let controller: ICommandable = this._dependencyResolver.getOneRequired<ICommandable>('controller');
        this._commandSet = controller.getCommandSet();

        let commands = this._commandSet.getCommands();
        for (let command of commands) {
            let route = command.getName();
            route = route[0] != '/' ? '/' + route : route;

            this.registerRoute('post', route, null, async (req, res) => {
                let params = req.body || {};
                let correlationId = this.getCorrelationId(req);
                let args = Parameters.fromValue(params);

                let timing = this.instrument(correlationId, this._baseRoute + '.' + command.getName());
                try {
                    let result = await command.execute(correlationId, args);
                    this.sendResult(req, res, result);
                    timing.endTiming();
                } catch (ex) {
                    timing.endFailure(ex);
                    this.sendError(req, res, ex);
                }
            });
        }

        if (this._swaggerAuto) {
            let swaggerConfig = this._config.getSection("swagger");
            let doc = new CommandableSwaggerDocument(this._baseRoute, swaggerConfig, commands);
            try {
               this.registerOpenApiSpec(doc.toString());
            } catch (ex) {
                throw ex;
            }
        }
    }
}