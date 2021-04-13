"use strict";
/** @module services */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestDetector = void 0;
/**
 * Helper class that retrieves parameters from HTTP requests.
 */
class HttpRequestDetector {
    /**
     * Detects the platform (using "user-agent") from which the given HTTP request was made.
     *
     * @param req   an HTTP request to process.
     * @returns the detected platform and version. Detectable platforms: "mobile", "iphone",
     * "ipad",  "macosx", "android",  "webos", "mac", "windows". Otherwise - "unknown" will
     * be returned.
     */
    static detectPlatform(req) {
        let ua = req.headers['user-agent'];
        let version;
        if (/mobile/i.test(ua)) {
            return 'mobile';
        }
        if (/like Mac OS X/.test(ua)) {
            version = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
            if (/iPhone/.test(ua)) {
                return 'iphone ' + version;
            }
            if (/iPad/.test(ua)) {
                return 'ipad ' + version;
            }
            return 'macosx ' + version;
        }
        if (/Android/.test(ua)) {
            version = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
            return 'android ' + version;
        }
        if (/webOS\//.test(ua)) {
            version = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
            return 'webos ' + version;
        }
        if (/(Intel|PPC) Mac OS X/.test(ua)) {
            version = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.');
            return 'mac ' + version;
        }
        if (/Windows NT/.test(ua)) {
            try {
                version = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
                return 'windows ' + version;
            }
            catch (ex) {
                return 'unknown';
            }
        }
        return 'unknown';
    }
    /**
     * Detects the browser (using "user-agent") from which the given HTTP request was made.
     *
     * @param req   an HTTP request to process.
     * @returns the detected browser. Detectable browsers: "chrome", "msie", "firefox",
     *          "safari". Otherwise - "unknown" will be returned.
     */
    static detectBrowser(req) {
        let ua = req.headers['user-agent'];
        if (/chrome/i.test(ua))
            return 'chrome';
        if (/msie/i.test(ua))
            return 'msie';
        if (/firefox/i.test(ua))
            return 'firefox';
        if (/safari/i.test(ua))
            return 'safari';
        return ua || 'unknown';
    }
    /**
     * Detects the IP address from which the given HTTP request was received.
     *
     * @param req   an HTTP request to process.
     * @returns the detected IP address (without a port). If no IP is detected -
     * <code>null</code> will be returned.
     */
    static detectAddress(req) {
        let ip = null;
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(',')[0];
        }
        if (ip == null && req.ip) {
            ip = req.ip;
        }
        if (ip == null && req.connection) {
            ip = req.connection.remoteAddress;
            if (!ip && req.connection.socket) {
                ip = req.connection.socket.remoteAddress;
            }
        }
        if (ip == null && req.socket) {
            ip = req.socket.remoteAddress;
        }
        // Remove port
        if (ip != null) {
            ip = ip.toString();
            var index = ip.indexOf(':');
            if (index > 0) {
                ip = ip.substring(0, index);
            }
        }
        return ip;
    }
    /**
     * Detects the host name of the request's destination server.
     *
     * @param req   an HTTP request to process.
     * @returns the destination server's host name.
     */
    static detectServerHost(req) {
        return "" + req.socket.localAddress;
    }
    /**
     * Detects the request's destination port number.
     *
     * @param req   an HTTP request to process.
     * @returns the detected port number or <code>80</code> (if none are detected).
     */
    static detectServerPort(req) {
        return req.socket.localPort;
    }
}
exports.HttpRequestDetector = HttpRequestDetector;
//# sourceMappingURL=HttpRequestDetector.js.map