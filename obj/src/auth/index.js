"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAuthManager = exports.OwnerAuthManager = exports.BasicAuthManager = void 0;
/**
 * @module auth
 * @preferred
 */
var BasicAuthorizer_1 = require("./BasicAuthorizer");
Object.defineProperty(exports, "BasicAuthManager", { enumerable: true, get: function () { return BasicAuthorizer_1.BasicAuthorizer; } });
var OwnerAuthorizer_1 = require("./OwnerAuthorizer");
Object.defineProperty(exports, "OwnerAuthManager", { enumerable: true, get: function () { return OwnerAuthorizer_1.OwnerAuthorizer; } });
var RoleAuthorizer_1 = require("./RoleAuthorizer");
Object.defineProperty(exports, "RoleAuthManager", { enumerable: true, get: function () { return RoleAuthorizer_1.RoleAuthorizer; } });
//# sourceMappingURL=index.js.map