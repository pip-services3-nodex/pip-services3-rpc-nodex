/** @module test */
import { CommandableHttpClient } from "../clients/CommandableHttpClient";
export declare class TestCommandableHttpClient extends CommandableHttpClient {
    constructor(baseRoute: string);
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
    callCommand<T>(name: string, correlationId: string, params: any): Promise<T>;
}
