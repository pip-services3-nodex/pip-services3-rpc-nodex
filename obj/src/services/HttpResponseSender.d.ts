/**
 * Helper class that handles HTTP-based responses.
 */
export declare class HttpResponseSender {
    /**
     * Sends error serialized as ErrorDescription object
     * and appropriate HTTP status code.
     * If status code is not defined, it uses 500 status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     * @param error     an error object to be sent.
     */
    static sendError(req: any, res: any, error: any): void;
    /**
     * Checks if result is a promise
     * @param result a result value.
     * @returns <code>true</code> if the result is a promise and <code>false</code> otherwise.
     */
    private static isPromise;
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
    static sendResult(req: any, res: any, result: any): void;
    /**
     * Creates a callback function that sends an empty result with 204 status code.
     * If error occur it sends ErrorDescription with approproate status code.
     *
     * @param req       a HTTP request object.
     * @param res       a HTTP response object.
     */
    static sendEmptyResult(req: any, res: any): void;
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
    static sendCreatedResult(req: any, res: any, result: any): void;
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
    static sendDeletedResult(req: any, res: any, result: any): void;
}
