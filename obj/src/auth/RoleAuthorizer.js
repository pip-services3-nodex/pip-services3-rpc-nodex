"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAuthorizer = void 0;
/** @module auth */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const HttpResponseSender_1 = require("../services/HttpResponseSender");
class RoleAuthorizer {
    userInRoles(roles) {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let authorized = false;
                user.roles = user.roles || [];
                for (let role of roles)
                    authorized = authorized || user.roles.includes(role);
                if (!authorized) {
                    HttpResponseSender_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_IN_ROLE', 'User must be ' + roles.join(' or ') + ' to perform this operation').withDetails('roles', roles).withStatus(403));
                }
                else {
                    next();
                }
            }
        };
    }
    userInRole(role) {
        return this.userInRoles([role]);
    }
    admin() {
        return this.userInRole('admin');
    }
}
exports.RoleAuthorizer = RoleAuthorizer;
//# sourceMappingURL=RoleAuthorizer.js.map