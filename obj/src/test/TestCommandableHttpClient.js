"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const _super = Object.create(null, {
            callCommand: { get: () => super.callCommand }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.callCommand.call(this, name, correlationId, params);
        });
    }
}
exports.TestCommandableHttpClient = TestCommandableHttpClient;
//# sourceMappingURL=TestCommandableHttpClient.js.map