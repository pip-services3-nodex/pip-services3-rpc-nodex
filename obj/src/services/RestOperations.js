"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestOperations = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_components_nodex_2 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const HttpResponseSender_1 = require("./HttpResponseSender");
class RestOperations {
    constructor() {
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
        this._counters = new pip_services3_components_nodex_2.CompositeCounters();
        this._dependencyResolver = new pip_services3_commons_nodex_3.DependencyResolver();
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);
    }
    getCorrelationId(req) {
        let correlationId = req.query.correlation_id;
        if (correlationId == null || correlationId == "") {
            correlationId = req.headers['correlation_id'];
        }
        return correlationId;
    }
    getFilterParams(req) {
        let value = Object.assign({}, req.query);
        delete value.skip;
        delete value.take;
        delete value.total;
        delete value.correlation_id;
        let filter = pip_services3_commons_nodex_1.FilterParams.fromValue(value);
        return filter;
    }
    getPagingParams(req) {
        let value = {
            skip: req.query.skip,
            take: req.query.take,
            total: req.query.total
        };
        let paging = pip_services3_commons_nodex_2.PagingParams.fromValue(value);
        return paging;
    }
    sendResult(req, res, result) {
        return HttpResponseSender_1.HttpResponseSender.sendResult(req, res, result);
    }
    sendEmptyResult(req, res) {
        return HttpResponseSender_1.HttpResponseSender.sendEmptyResult(req, res);
    }
    sendCreatedResult(req, res, result) {
        return HttpResponseSender_1.HttpResponseSender.sendCreatedResult(req, res, result);
    }
    sendDeletedResult(req, res, result) {
        return HttpResponseSender_1.HttpResponseSender.sendDeletedResult(req, res, result);
    }
    sendError(req, res, error) {
        HttpResponseSender_1.HttpResponseSender.sendError(req, res, error);
    }
    sendBadRequest(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_4.BadRequestException(correlationId, 'BAD_REQUEST', message);
        this.sendError(req, res, error);
    }
    sendUnauthorized(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_5.UnauthorizedException(correlationId, 'UNAUTHORIZED', message);
        this.sendError(req, res, error);
    }
    sendNotFound(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_6.NotFoundException(correlationId, 'NOT_FOUND', message);
        this.sendError(req, res, error);
    }
    sendConflict(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_7.ConflictException(correlationId, 'CONFLICT', message);
        this.sendError(req, res, error);
    }
    sendSessionExpired(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_8.UnknownException(correlationId, 'SESSION_EXPIRED', message);
        error.status = 440;
        this.sendError(req, res, error);
    }
    sendInternalError(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_8.UnknownException(correlationId, 'INTERNAL', message);
        this.sendError(req, res, error);
    }
    sendServerUnavailable(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services3_commons_nodex_7.ConflictException(correlationId, 'SERVER_UNAVAILABLE', message);
        error.status = 503;
        this.sendError(req, res, error);
    }
    invoke(operation) {
        return (req, res) => {
            this[operation](req, res);
        };
    }
}
exports.RestOperations = RestOperations;
//# sourceMappingURL=RestOperations.js.map