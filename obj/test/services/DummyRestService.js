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
exports.DummyRestService = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const DummySchema_1 = require("../DummySchema");
const RestService_1 = require("../../src/services/RestService");
class DummyRestService extends RestService_1.RestService {
    constructor() {
        super();
        this._numberOfCalls = 0;
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("pip-services-dummies", "controller", "default", "*", "*"));
    }
    configure(config) {
        super.configure(config);
        this._swaggerContent = config.getAsNullableString("swagger.content");
        this._swaggerPath = config.getAsNullableString("swagger.path");
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getNumberOfCalls() {
        return this._numberOfCalls;
    }
    incrementNumberOfCalls(req, res, next) {
        this._numberOfCalls++;
        next();
    }
    getPageByFilter(req, res) {
        let promise = this._controller.getPageByFilter(this.getCorrelationId(req), new pip_services3_commons_nodex_2.FilterParams(req.params), new pip_services3_commons_nodex_3.PagingParams(req.params));
        this.sendResult(req, res, promise);
    }
    getOneById(req, res) {
        let promise = this._controller.getOneById(this.getCorrelationId(req), req.params.dummy_id);
        this.sendResult(req, res, promise);
    }
    create(req, res) {
        let promise = this._controller.create(this.getCorrelationId(req), req.body);
        this.sendCreatedResult(req, res, promise);
    }
    update(req, res) {
        let promise = this._controller.update(this.getCorrelationId(req), req.body);
        this.sendResult(req, res, promise);
    }
    deleteById(req, res) {
        let promise = this._controller.deleteById(this.getCorrelationId(req), req.params.dummy_id);
        this.sendDeletedResult(req, res, promise);
    }
    checkCorrelationId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._controller.checkCorrelationId(this.getCorrelationId(req));
                this.sendResult(req, res, { correlation_id: result });
            }
            catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
    register() {
        this.registerInterceptor('/dummies$', this.incrementNumberOfCalls);
        this.registerRoute('get', '/dummies', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withOptionalProperty("skip", pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty("take", pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty("total", pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty("body", new pip_services3_commons_nodex_6.FilterParamsSchema()), this.getPageByFilter);
        this.registerRoute("get", "/dummies/check/correlation_id", new pip_services3_commons_nodex_4.ObjectSchema(true), this.checkCorrelationId);
        this.registerRoute('get', '/dummies/:dummy_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("dummy_id", pip_services3_commons_nodex_5.TypeCode.String), this.getOneById);
        this.registerRoute('post', '/dummies', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("body", new DummySchema_1.DummySchema()), this.create);
        this.registerRoute('put', '/dummies', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("body", new DummySchema_1.DummySchema()), this.update);
        this.registerRoute('delete', '/dummies/:dummy_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("dummy_id", pip_services3_commons_nodex_5.TypeCode.String), this.deleteById);
        if (this._swaggerContent) {
            this.registerOpenApiSpec(this._swaggerContent);
        }
        if (this._swaggerPath) {
            this.registerOpenApiSpecFromFile(this._swaggerPath);
        }
    }
}
exports.DummyRestService = DummyRestService;
//# sourceMappingURL=DummyRestService.js.map