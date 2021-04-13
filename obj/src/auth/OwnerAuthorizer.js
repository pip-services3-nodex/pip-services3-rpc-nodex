"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerAuthorizer = void 0;
/** @module auth */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const HttpResponseSender_1 = require("../services/HttpResponseSender");
class OwnerAuthorizer {
    owner(idParam = 'user_id') {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let userId = req.params[idParam] || req.param(idParam);
                if (req.user_id != userId) {
                    HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'FORBIDDEN', 'Only data owner can perform this operation').withStatus(403));
                }
                else {
                    next();
                }
            }
        };
    }
    ownerOrAdmin(idParam = 'user_id') {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let userId = req.params[idParam] || req.param(idParam);
                let roles = req.user != null ? req.user.roles : null;
                roles = roles || [];
                let admin = roles.includes('admin');
                if (req.user_id != userId && !admin) {
                    HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'FORBIDDEN', 'Only data owner can perform this operation').withStatus(403));
                }
                else {
                    next();
                }
            }
        };
    }
}
exports.OwnerAuthorizer = OwnerAuthorizer;
//# sourceMappingURL=OwnerAuthorizer.js.map