"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCommandableHttpClient = void 0;
/** @module test */
const CommandableHttpClient_1 = require("../clients/CommandableHttpClient");
class TestCommandableHttpClient extends CommandableHttpClient_1.CommandableHttpClient {
    constructor(baseRoute) {
        super(baseRoute);
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
    callCommand(name, correlationId, params) {
        return super.callCommand(name, correlationId, params);
    }
}
exports.TestCommandableHttpClient = TestCommandableHttpClient;
//# sourceMappingURL=TestCommandableHttpClient.js.map