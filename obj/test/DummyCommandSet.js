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
exports.DummyCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const DummySchema_1 = require("./DummySchema");
class DummyCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeGetPageByFilterCommand());
        this.addCommand(this.makeGetOneByIdCommand());
        this.addCommand(this.makeCreateCommand());
        this.addCommand(this.makeUpdateCommand());
        this.addCommand(this.makeDeleteByIdCommand());
        this.addCommand(this.makeCheckCorrelationIdCommand());
    }
    makeGetPageByFilterCommand() {
        return new pip_services3_commons_nodex_2.Command("get_dummies", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty("filter", new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty("paging", new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._controller.getPageByFilter(correlationId, filter, paging);
        }));
    }
    makeGetOneByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_dummy_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("dummy_id", pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsString("dummy_id");
            return yield this._controller.getOneById(correlationId, id);
        }));
    }
    makeCreateCommand() {
        return new pip_services3_commons_nodex_2.Command("create_dummy", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("dummy", new DummySchema_1.DummySchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let entity = args.get("dummy");
            return yield this._controller.create(correlationId, entity);
        }));
    }
    makeUpdateCommand() {
        return new pip_services3_commons_nodex_2.Command("update_dummy", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("dummy", new DummySchema_1.DummySchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let entity = args.get("dummy");
            return yield this._controller.update(correlationId, entity);
        }));
    }
    makeDeleteByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_dummy", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("dummy_id", pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsString("dummy_id");
            return yield this._controller.deleteById(correlationId, id);
        }));
    }
    makeCheckCorrelationIdCommand() {
        return new pip_services3_commons_nodex_2.Command("check_correlation_id", new pip_services3_commons_nodex_5.ObjectSchema(true), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let value = yield this._controller.checkCorrelationId(correlationId);
            return { correlation_id: value };
        }));
    }
}
exports.DummyCommandSet = DummyCommandSet;
//# sourceMappingURL=DummyCommandSet.js.map