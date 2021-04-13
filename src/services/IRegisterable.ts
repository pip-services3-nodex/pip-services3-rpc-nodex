/** @module services */

/**
 * Interface to perform on-demand registrations. 
 */
export interface IRegisterable {
    /**
     * Perform required registration steps.
     */
    register(): void;
}