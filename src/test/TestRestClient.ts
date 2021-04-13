/** @module test */
import { RestClient } from "../clients/RestClient";

/**
 * REST client used for automated testing.
 */
export class TestRestClient extends RestClient {
    public constructor(baseRoute: string) {
        super();
        this._baseRoute = baseRoute;
    }

    /**
     * Calls a remote method via HTTP/REST protocol.
     * 
     * @param method            HTTP method: "get", "head", "post", "put", "delete"
     * @param route             a command route. Base route will be added to this route
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param params            (optional) query parameters.
     * @param data              (optional) body object.
     * @returns                 a result object.
     */
    public call<T>(method: string, route: string, correlationId?: string, params: any = {}, data?: any): Promise<T> {
        return super.call<T>(method, route, correlationId, params, data);
    }
}