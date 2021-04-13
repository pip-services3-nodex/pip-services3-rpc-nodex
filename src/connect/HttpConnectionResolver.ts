/** @module connect */
/** @hidden */
const url = require('url');

import { IReferenceable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { ConnectionResolver } from 'pip-services3-components-nodex';
import { ConnectionParams } from 'pip-services3-components-nodex';
import { CredentialResolver } from 'pip-services3-components-nodex';
import { CredentialParams } from 'pip-services3-components-nodex';
import { ConfigException } from 'pip-services3-commons-nodex';

/**
 * Helper class to retrieve connections for HTTP-based services abd clients.
 * 
 * In addition to regular functions of ConnectionResolver is able to parse http:// URIs
 * and validate connection parameters before returning them.
 * 
 * ### Configuration parameters ###
 * 
 * - connection:    
 *   - discovery_key:               (optional) a key to retrieve the connection from [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]]
 *   - ...                          other connection parameters
 * 
 * - connections:                   alternative to connection
 *   - [connection params 1]:       first connection parameters
 *   -  ...
 *   - [connection params N]:       Nth connection parameters
 *   -  ...
 * 
 * ### References ###
 * 
 * - <code>\*:discovery:\*:\*:1.0</code>            (optional) [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/interfaces/connect.idiscovery.html IDiscovery]] services
 * 
 * @see [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/classes/connect.connectionparams.html ConnectionParams]] 
 * @see [[https://pip-services3-nodex.github.io/pip-services3-components-nodex/classes/connect.connectionresolver.html ConnectionResolver]] 
 * 
 * ### Example ###
 * 
 *     let config = ConfigParams.fromTuples(
 *          "connection.host", "10.1.1.100",
 *          "connection.port", 8080
 *     );
 * 
 *     let connectionResolver = new HttpConnectionResolver();
 *     connectionResolver.configure(config);
 *     connectionResolver.setReferences(references);
 * 
 *     let connection = await connectionResolver.resolve("123");
 *     // Now use connection...
 */
export class HttpConnectionResolver implements IReferenceable, IConfigurable {
    /** 
     * The base connection resolver.
     */
    protected _connectionResolver: ConnectionResolver = new ConnectionResolver();
    /**
     * The base credential resolver.
     */
    protected _credentialResolver: CredentialResolver = new CredentialResolver();

    /**
     * Configures component by passing configuration parameters.
     * 
     * @param config    configuration parameters to be set.
     */
    public configure(config: ConfigParams): void {
        this._connectionResolver.configure(config);
        this._credentialResolver.configure(config);
    }

    /**
	 * Sets references to dependent components.
	 * 
	 * @param references 	references to locate the component dependencies. 
     */
    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
        this._credentialResolver.setReferences(references);
    }

    private validateConnection(correlationId: string,
        connection: ConnectionParams, credential: CredentialParams): void {
        if (connection == null) {
            throw new ConfigException(correlationId, "NO_CONNECTION", "HTTP connection is not set");
        }

        let uri = connection.getUri();
        if (uri != null) return;

        let protocol: string = connection.getProtocolWithDefault("http");
        if ("http" != protocol && "https" != protocol) {
            throw new ConfigException(
                correlationId, "WRONG_PROTOCOL", "Protocol is not supported by REST connection")
                .withDetails("protocol", protocol);
        }

        let host = connection.getHost();
        if (host == null) {
            throw new ConfigException(correlationId, "NO_HOST", "Connection host is not set");
        }

        let port = connection.getPort();
        if (port == 0) {
            throw new ConfigException(correlationId, "NO_PORT", "Connection port is not set");
        }

        // Check HTTPS credentials
        if (protocol == "https") {
            // Check for credential
            if (credential == null) {
                throw new ConfigException(
                    correlationId, "NO_CREDENTIAL", "SSL certificates are not configured for HTTPS protocol");
            } else {
                // Sometimes when we use https we are on an internal network and do not want to have to deal with security.
                // When we need a https connection and we don't want to pass credentials, flag is 'credential.internal_network',
                // this flag just has to be present and non null for this functionality to work.
                if (credential.getAsNullableString("internal_network") == null) {
                    if (credential.getAsNullableString('ssl_key_file') == null) {
                        throw new ConfigException(
                            correlationId, "NO_SSL_KEY_FILE", "SSL key file is not configured in credentials");
                    } else if (credential.getAsNullableString('ssl_crt_file') == null) {
                        throw new ConfigException(
                            correlationId, "NO_SSL_CRT_FILE", "SSL crt file is not configured in credentials");
                    }
                }
            }
        }
    }

    private composeConnection(connections: ConnectionParams[], credential: CredentialParams): ConfigParams {
        let connection = ConfigParams.mergeConfigs(...connections);

        let uri = connection.getAsString("uri");

        if (uri == null || uri == "") {
            let protocol = connection.getAsStringWithDefault("protocol", "uri");
            let host = connection.getAsString("host");
            let port = connection.getAsInteger("port");

            uri = protocol + "://" + host;
            if (port > 0) {
                uri += ":" + port;
            }
            connection.setAsObject("uri", uri);
        } else {
            let address = url.parse(uri);
            let protocol = ("" + address.protocol).replace(':', '');

            connection.setAsObject("protocol", protocol);
            connection.setAsObject("host", address.hostname);
            connection.setAsObject("port", address.port);
        }

        if (connection.getAsString("protocol") == "https" && credential != null) {
            if (credential.getAsNullableString("internal_network") == null) {
                connection = connection.override(credential);
            }
        }

        return connection;
    }

    /**
     * Resolves a single component connection. If connections are configured to be retrieved
     * from Discovery service it finds a IDiscovery and resolves the connection there.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @returns 			    a resolved connection options
     */
    public async resolve(correlationId: string): Promise<ConfigParams> {
        let connection = await this._connectionResolver.resolve(correlationId);
        let credential = await this._credentialResolver.lookup(correlationId);
        this.validateConnection(correlationId, connection, credential);
        return this.composeConnection([connection], credential);
    }

    /**
     * Resolves all component connection. If connections are configured to be retrieved
     * from Discovery service it finds a IDiscovery and resolves the connection there.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @returns 			    a resolved connection options
     */
    public async resolveAll(correlationId: string): Promise<ConfigParams> {
        let connections = await this._connectionResolver.resolveAll(correlationId);
        let credential = await this._credentialResolver.lookup(correlationId);

        connections = connections || [];
        for (let connection of connections) {
            this.validateConnection(correlationId, connection, credential);
        }
        
        return this.composeConnection(connections, credential);
    }

    /**
     * Registers the given connection in all referenced discovery services.
     * This method can be used for dynamic service discovery.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        a connection to register.
     */
    public async register(correlationId: string): Promise<void> {
        let connection = await this._connectionResolver.resolve(correlationId);
        let credential = await this._credentialResolver.lookup(correlationId);

        // Validate connection
        this.validateConnection(correlationId, connection, credential);

        await this._connectionResolver.register(correlationId, connection);
    }

}
