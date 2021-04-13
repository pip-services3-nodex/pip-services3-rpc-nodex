"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthorizer = void 0;
/** @module auth */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const HttpResponseSender_1 = require("../services/HttpResponseSender");
class BasicAuthorizer {
    anybody() {
        return (req, res, next) => {
            next();
        };
    }
    signed() {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                next();
            }
        };
    }
}
exports.BasicAuthorizer = BasicAuthorizer;
//# sourceMappingURL=BasicAuthorizer.js.map