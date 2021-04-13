"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutOperations = void 0;
/** @module services */
const os = require('os');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const HttpRequestDetector_1 = require("./HttpRequestDetector");
const RestOperations_1 = require("./RestOperations");
class AboutOperations extends RestOperations_1.RestOperations {
    setReferences(references) {
        super.setReferences(references);
        this._contextInfo = references.getOneOptional(new pip_services3_commons_nodex_1.Descriptor('pip-services', 'context-info', '*', '*', '*'));
    }
    getAboutOperation() {
        return (req, res) => {
            this.about(req, res);
        };
    }
    getNetworkAddresses() {
        let interfaces = os.networkInterfaces();
        let addresses = [];
        for (let k in interfaces) {
            for (let k2 in interfaces[k]) {
                let address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        return addresses;
    }
    about(req, res) {
        let about = {
            server: {
                name: this._contextInfo != null ? this._contextInfo.name : 'unknown',
                description: this._contextInfo != null ? this._contextInfo.description : null,
                properties: this._contextInfo != null ? this._contextInfo.properties : null,
                uptime: this._contextInfo != null ? this._contextInfo.uptime : null,
                start_time: this._contextInfo != null ? this._contextInfo.startTime : null,
                current_time: new Date().toISOString(),
                protocol: req.protocol,
                host: HttpRequestDetector_1.HttpRequestDetector.detectServerHost(req),
                addresses: this.getNetworkAddresses(),
                port: HttpRequestDetector_1.HttpRequestDetector.detectServerPort(req),
                url: req.originalUrl,
            },
            client: {
                address: HttpRequestDetector_1.HttpRequestDetector.detectAddress(req),
                client: HttpRequestDetector_1.HttpRequestDetector.detectBrowser(req),
                platform: HttpRequestDetector_1.HttpRequestDetector.detectPlatform(req),
                user: req.user
            }
        };
        res.json(about);
    }
}
exports.AboutOperations = AboutOperations;
//# sourceMappingURL=AboutOperations.js.map