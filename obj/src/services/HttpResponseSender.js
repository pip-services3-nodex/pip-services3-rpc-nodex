"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponseSender = void 0;
/** @module services */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
/**
 * Helper class that handles HTTP-based responses.
 */
class HttpResponseSender {
    /**
     * Sends error serialized as ErrorDescription object
     * and appropriate HTTP status code.
     * If status code is not defined, it uses 500 status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     * @param error     an error object to be sent.
     */
    static sendError(req, res, error) {
        error = error || {};
        error = pip_services3_commons_nodex_1.ApplicationException.unwrapError(error);
        let result = {
            code: error.code || "UNDEFINED",
            status: error.status || 500,
            message: error.message || "Unknown error",
            name: error.name,
            component: error.component,
            stack: error.stack,
            cause: error.cause,
            details: error.details
        };
        res.status(result.status);
        res.json(result);
    }
    /**
     * Checks if result is a promise
     * @param result a result value.
     * @returns <code>true</code> if the result is a promise and <code>false</code> otherwise.
     */
    static isPromise(result) {
        if (result == null)
            return false;
        if (result instanceof Promise)
            return true;
        return (typeof result.then === "function") && (typeof result.catch === "function");
    }
    /**
     * Creates a callback function that sends result as JSON object.
     * That callack function call be called directly or passed
     * as a parameter to business logic components.
     *
     * If object is not null it returns 200 status code.
     * For null results it returns 204 status code.
     * If error occur it sends ErrorDescription with approproate status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     * @param result   an execution result or a promise with execution result
     */
    static sendResult(req, res, result) {
        if (this.isPromise(result)) {
            result
                .then((result) => {
                if (result == null) {
                    res.send(204);
                }
                else {
                    res.json(result);
                }
            })
                .catch((err) => {
                HttpResponseSender.sendError(req, res, err);
            });
        }
        else {
            if (result == null) {
                res.send(204);
            }
            else {
                res.json(result);
            }
        }
    }
    /**
     * Creates a callback function that sends an empty result with 204 status code.
     * If error occur it sends ErrorDescription with approproate status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     */
    static sendEmptyResult(req, res) {
        res.send(204);
    }
    /**
     * Creates a callback function that sends newly created object as JSON.
     * That callack function call be called directly or passed
     * as a parameter to business logic components.
     *
     * If object is not null it returns 201 status code.
     * For null results it returns 204 status code.
     * If error occur it sends ErrorDescription with approproate status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     * @param result   an execution result or a promise with execution result
     */
    static sendCreatedResult(req, res, result) {
        if (this.isPromise(result)) {
            result
                .then((result) => {
                if (result == null) {
                    res.status(204);
                }
                else {
                    res.status(201);
                    res.json(result);
                }
            })
                .catch((err) => {
                HttpResponseSender.sendError(req, res, err);
            });
        }
        else {
            if (result == null) {
                res.status(204);
            }
            else {
                res.status(201);
                res.json(result);
            }
        }
    }
    /**
     * Creates a callback function that sends deleted object as JSON.
     * That callack function call be called directly or passed
     * as a parameter to business logic components.
     *
     * If object is not null it returns 200 status code.
     * For null results it returns 204 status code.
     * If error occur it sends ErrorDescription with approproate status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     * @param result   an execution result or a promise with execution result
     */
    static sendDeletedResult(req, res, result) {
        if (this.isPromise(result)) {
            result
                .then((result) => {
                if (result == null) {
                    res.status(204);
                }
                else {
                    res.status(200);
                    res.json(result);
                }
            })
                .catch((err) => {
                HttpResponseSender.sendError(req, res, err);
            });
        }
        else {
            if (result == null) {
                res.status(204);
            }
            else {
                res.status(200);
                res.json(result);
            }
        }
    }
}
exports.HttpResponseSender = HttpResponseSender;
//# sourceMappingURL=HttpResponseSender.js.map