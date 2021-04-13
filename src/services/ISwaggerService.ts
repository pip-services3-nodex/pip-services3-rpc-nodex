/** @module services */

/**
 * Interface to perform Swagger registrations. 
 */
export interface ISwaggerService {
    /**
     * Perform required Swagger registration steps.
     */
    registerOpenApiSpec(baseRoute: string, swaggerRoute: string): void;
}