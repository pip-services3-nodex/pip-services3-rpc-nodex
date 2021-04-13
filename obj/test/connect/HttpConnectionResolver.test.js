"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const HttpConnectionResolver_1 = require("../../src/connect/HttpConnectionResolver");
suite('HttpConnectionResolver', () => {
    test('Resolve URI', () => __awaiter(void 0, void 0, void 0, function* () {
        let resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.uri", "http://somewhere.com:777"));
        let connection = yield resolver.resolve(null);
        assert.equal("http", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(777, connection.getAsInteger("port"));
    }));
    test('Resolve Parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        let resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "somewhere.com", "connection.port", 777));
        let connection = yield resolver.resolve(null);
        assert.equal("http://somewhere.com:777", connection.getAsString("uri"));
    }));
    test('TestHttpsWithCredentialsConnectionParams', () => __awaiter(void 0, void 0, void 0, function* () {
        let resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.host", "somewhere.com", "connection.port", 123, "connection.protocol", "https", "credential.ssl_key_file", "ssl_key_file", "credential.ssl_crt_file", "ssl_crt_file"));
        let connection = yield resolver.resolve(null);
        assert.equal("https", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(123, connection.getAsInteger("port"));
        assert.equal("https://somewhere.com:123", connection.getAsString("uri"));
        assert.equal("ssl_key_file", connection.getAsString("ssl_key_file"));
        assert.equal("ssl_crt_file", connection.getAsString("ssl_crt_file"));
    }));
    test('TestHttpsWithNoCredentialsConnectionParams', () => __awaiter(void 0, void 0, void 0, function* () {
        let resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.host", "somewhere.com", "connection.port", 123, "connection.protocol", "https", "credential.internal_network", "internal_network"));
        let connection = yield resolver.resolve(null);
        assert.equal("https", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(123, connection.getAsInteger("port"));
        assert.equal("https://somewhere.com:123", connection.getAsString("uri"));
        assert.isNull(connection.getAsString("internal_network"));
    }));
    test('TestHttpsWithMissingCredentialsConnectionParams', () => __awaiter(void 0, void 0, void 0, function* () {
        // section missing
        let resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.host", "somewhere.com", "connection.port", 123, "connection.protocol", "https"));
        try {
            yield resolver.resolve(null);
            assert.fail("Should throw an exception");
        }
        catch (err) {
            assert.equal("NO_CREDENTIAL", err.code);
            assert.equal("NO_CREDENTIAL", err.name);
            assert.equal("SSL certificates are not configured for HTTPS protocol", err.message);
            assert.equal("Misconfiguration", err.category);
        }
        // ssl_crt_file missing
        resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.host", "somewhere.com", "connection.port", 123, "connection.protocol", "https", "credential.ssl_key_file", "ssl_key_file"));
        try {
            yield resolver.resolve(null);
            assert.fail("Should throw an exception");
        }
        catch (err) {
            assert.equal("NO_SSL_CRT_FILE", err.code);
            assert.equal("NO_SSL_CRT_FILE", err.name);
            assert.equal("SSL crt file is not configured in credentials", err.message);
            assert.equal("Misconfiguration", err.category);
        }
        // ssl_key_file missing
        resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.host", "somewhere.com", "connection.port", 123, "connection.protocol", "https", "credential.ssl_crt_file", "ssl_crt_file"));
        try {
            yield resolver.resolve(null);
            assert.fail("Should throw an exception");
        }
        catch (err) {
            assert.equal("NO_SSL_KEY_FILE", err.code);
            assert.equal("NO_SSL_KEY_FILE", err.name);
            assert.equal("SSL key file is not configured in credentials", err.message);
            assert.equal("Misconfiguration", err.category);
        }
        // ssl_key_file,  ssl_crt_file present
        resolver = new HttpConnectionResolver_1.HttpConnectionResolver();
        resolver.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.host", "somewhere.com", "connection.port", 123, "connection.protocol", "https", "credential.ssl_key_file", "ssl_key_file", "credential.ssl_crt_file", "ssl_crt_file"));
        let connection = yield resolver.resolve(null);
        assert.equal("https", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(123, connection.getAsInteger("port"));
        assert.equal("https://somewhere.com:123", connection.getAsString("uri"));
        assert.equal("ssl_key_file", connection.getAsString("ssl_key_file"));
        assert.equal("ssl_crt_file", connection.getAsString("ssl_crt_file"));
    }));
});
//# sourceMappingURL=HttpConnectionResolver.test.js.map