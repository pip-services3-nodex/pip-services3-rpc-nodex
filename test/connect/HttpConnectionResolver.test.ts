const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { HttpConnectionResolver } from '../../src/connect/HttpConnectionResolver';

suite('HttpConnectionResolver', () => {

    test('Resolve URI', async () => {
        let resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.uri", "http://somewhere.com:777"
        ));

        let connection = await resolver.resolve(null);
        assert.equal("http", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(777, connection.getAsInteger("port"));
    });

    test('Resolve Parameters', async () => {
        let resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.protocol", "http",
            "connection.host", "somewhere.com",
            "connection.port", 777
        ));

        let connection = await resolver.resolve(null);
        assert.equal("http://somewhere.com:777", connection.getAsString("uri"));
    });

    test('TestHttpsWithCredentialsConnectionParams', async () => {
        let resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.host", "somewhere.com",
            "connection.port", 123,
            "connection.protocol", "https",
            "credential.ssl_key_file", "ssl_key_file",
            "credential.ssl_crt_file", "ssl_crt_file"
        ));

        let connection = await resolver.resolve(null);
        assert.equal("https", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(123, connection.getAsInteger("port"));
        assert.equal("https://somewhere.com:123", connection.getAsString("uri"));
        assert.equal("ssl_key_file", connection.getAsString("ssl_key_file"));
        assert.equal("ssl_crt_file", connection.getAsString("ssl_crt_file"));
    });

    test('TestHttpsWithNoCredentialsConnectionParams', async () => {
        let resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.host", "somewhere.com",
            "connection.port", 123,
            "connection.protocol", "https",
            "credential.internal_network", "internal_network"
        ));

        let connection = await resolver.resolve(null);
        assert.equal("https", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(123, connection.getAsInteger("port"));
        assert.equal("https://somewhere.com:123", connection.getAsString("uri"));
        assert.isNull(connection.getAsString("internal_network"));
    });

    test('TestHttpsWithMissingCredentialsConnectionParams', async () => {
        // section missing
        let resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.host", "somewhere.com",
            "connection.port", 123,
            "connection.protocol", "https"
        ));

        try {
            await resolver.resolve(null);
            assert.fail("Should throw an exception");
        } catch (err) {
            assert.equal("NO_CREDENTIAL", err.code);
            assert.equal("NO_CREDENTIAL", err.name);
            assert.equal("SSL certificates are not configured for HTTPS protocol", err.message);
            assert.equal("Misconfiguration", err.category);
        }

        // ssl_crt_file missing
        resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.host", "somewhere.com",
            "connection.port", 123,
            "connection.protocol", "https",
            "credential.ssl_key_file", "ssl_key_file"
        ));

        try {
            await resolver.resolve(null);
            assert.fail("Should throw an exception");
        } catch (err) {
            assert.equal("NO_SSL_CRT_FILE", err.code);
            assert.equal("NO_SSL_CRT_FILE", err.name);
            assert.equal("SSL crt file is not configured in credentials", err.message);
            assert.equal("Misconfiguration", err.category);
        }

        // ssl_key_file missing
        resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.host", "somewhere.com",
            "connection.port", 123,
            "connection.protocol", "https",
            "credential.ssl_crt_file", "ssl_crt_file"
        ));

        try {
            await resolver.resolve(null);
            assert.fail("Should throw an exception");
        } catch (err) {
            assert.equal("NO_SSL_KEY_FILE", err.code);
            assert.equal("NO_SSL_KEY_FILE", err.name);
            assert.equal("SSL key file is not configured in credentials", err.message);
            assert.equal("Misconfiguration", err.category);
        }

        // ssl_key_file,  ssl_crt_file present
        resolver = new HttpConnectionResolver();
        resolver.configure(ConfigParams.fromTuples(
            "connection.host", "somewhere.com",
            "connection.port", 123,
            "connection.protocol", "https",
            "credential.ssl_key_file", "ssl_key_file",
            "credential.ssl_crt_file", "ssl_crt_file"
        ));

        let connection = await resolver.resolve(null);
        assert.equal("https", connection.getAsString("protocol"));
        assert.equal("somewhere.com", connection.getAsString("host"));
        assert.equal(123, connection.getAsInteger("port"));
        assert.equal("https://somewhere.com:123", connection.getAsString("uri"));
        assert.equal("ssl_key_file", connection.getAsString("ssl_key_file"));
        assert.equal("ssl_crt_file", connection.getAsString("ssl_crt_file"));
    });
});
