# <img src="https://uploads-ssl.webflow.com/5ea5d3315186cf5ec60c3ee4/5edf1c94ce4c859f2b188094_logo.svg" alt="Pip.Services Logo" width="200"> <br/> Remote Procedure Calls for Pip.Services in Node.js / ES2017 Changelog

## <a name="1.2.3"></a> 1.2.3 (2022-05-20)
### Bug Fixes
- HttpResponseSender fixed sendError addind error type and category 

## <a name="1.2.2"></a> 1.2.2 (2022-03-04)

### Bug Fixes
* **services** Fixed a bug that allows calls to properly return when an exception is thrown

## <a name="1.2.1"></a> 1.2.1 (2021-11-25)

### Bug Fixes
* **services** Fixed bug with returning CORS header Access-Control-Allow-Origin

## <a name="1.2.0"></a> 1.2.0 (2021-10-29)

### Bug Fixes
* **services** Fixed bug with formatting ArraySchema in swagger document

## <a name="1.2.0"></a> 1.2.0 (2021-10-21)
### Features
* **services**  Added RegRxp supporting to interceptors 
   Examples:
   - the interceptor route **"/dummies"** corresponds to all of this routes **"/dummies"**, **"/dummies/check"**, **"/dummies/test"**
   - the interceptor route **"/dummies$"** corresponds only for this route **"/dummies"**. The routes **"/dummies/check"**, **"/dummies/test"** aren't processing by interceptor
   Please, don't forgot, route in interceptor always automaticaly concateneted with base route, like this **service_base_route + route_in_interceptor**. 
   For example, "/api/v1/" - service base route, "/dummies$" - interceptor route, in result will be next expression - "/api/v1/dummies$"

## <a name="1.1.0"></a> 1.1.0 (2021-07-27)

### Features
* **services** Added configuration of CORS headers to HttpEndpoint

## <a name="1.0.0"></a> 1.0.0 (2021-04-11)

Initial public release

