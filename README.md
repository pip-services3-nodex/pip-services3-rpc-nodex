# <img src="https://uploads-ssl.webflow.com/5ea5d3315186cf5ec60c3ee4/5edf1c94ce4c859f2b188094_logo.svg" alt="Pip.Services Logo" width="200"> <br/> Remote Procedure Calls for Pip.Services in Node.js / ES2017

This module is a part of the [Pip.Services](http://pipservices.org) polyglot microservices toolkit.

The rpc module provides the synchronous communication using local calls or the HTTP(S) protocol. It contains both server and client side implementations.

The module contains the following packages:
- **Auth** - authentication and authorization components
- **Build** - HTTP service factory
- **Clients** - mechanisms for retrieving connection settings from the microservice’s configuration and providing clients and services with these settings
- **Connect** - helper module to retrieve connections for HTTP-based services and clients
- **Services** - basic implementation of services for connecting via the HTTP/REST protocol and using the Commandable pattern over HTTP

<a name="links"></a> Quick links:

* [Your first microservice in Node.js](https://www.pipservices.org/docs/quickstart/nodejs) 
* [Data Microservice. Step 5](https://www.pipservices.org/docs/tutorials/data-microservice/service)
* [Microservice Facade](https://www.pipservices.org/docs/tutorials/microservice-facade/microservice-facade-main) 
* [Client Library. Step 2](https://www.pipservices.org/docs/tutorials/client-lib/direct-client)
* [Client Library. Step 3](https://www.pipservices.org/docs/tutorials/client-lib/http-client)
* [API Reference](https://pip-services3-nodex.github.io/pip-services3-rpc-nodex/globals.html)
* [Change Log](CHANGELOG.md)
* [Get Help](https://www.pipservices.org/community/help)
* [Contribute](https://www.pipservices.org/community/contribute)


## Use

Install the NPM package as
```bash
npm install pip-services3-rpc-nodex --save
```

## Develop

For development you shall install the following prerequisites:
* Node.js 8+
* Visual Studio Code or another IDE of your choice
* Docker
* Typescript

Install dependencies:
```bash
npm install
```

Compile the code:
```bash
tsc
```

Run automated tests:
```bash
npm test
```

Generate API documentation:
```bash
./docgen.ps1
```

Before committing changes run dockerized build and test as:
```bash
./build.ps1
./test.ps1
./clear.ps1
```

## Contacts

The Node.js version of Pip.Services is created and maintained by:
- **Volodymyr Tkachenko**
- **Sergey Seroukhov**
- **Mark Zontak**

The documentation is written by:
- **Mark Makarychev**
