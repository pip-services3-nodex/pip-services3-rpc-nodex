/** @module services */
/**
 * Helper class that retrieves parameters from HTTP requests.
 */
export declare class HttpRequestDetector {
    /**
     * Detects the platform (using "user-agent") from which the given HTTP request was made.
     *
     * @param req   an HTTP request to process.
     * @returns the detected platform and version. Detectable platforms: "mobile", "iphone",
     * "ipad",  "macosx", "android",  "webos", "mac", "windows". Otherwise - "unknown" will
     * be returned.
     */
    static detectPlatform(req: any): string;
    /**
     * Detects the browser (using "user-agent") from which the given HTTP request was made.
     *
     * @param req   an HTTP request to process.
     * @returns the detected browser. Detectable browsers: "chrome", "msie", "firefox",
     *          "safari". Otherwise - "unknown" will be returned.
     */
    static detectBrowser(req: any): string;
    /**
     * Detects the IP address from which the given HTTP request was received.
     *
     * @param req   an HTTP request to process.
     * @returns the detected IP address (without a port). If no IP is detected -
     * <code>null</code> will be returned.
     */
    static detectAddress(req: any): string;
    /**
     * Detects the host name of the request's destination server.
     *
     * @param req   an HTTP request to process.
     * @returns the destination server's host name.
     */
    static detectServerHost(req: any): string;
    /**
     * Detects the request's destination port number.
     *
     * @param req   an HTTP request to process.
     * @returns the detected port number or <code>80</code> (if none are detected).
     */
    static detectServerPort(req: any): any;
}
