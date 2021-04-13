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
exports.DummyController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const DummyCommandSet_1 = require("./DummyCommandSet");
class DummyController {
    constructor() {
        this._entities = [];
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new DummyCommandSet_1.DummyCommandSet(this);
        return this._commandSet;
    }
    getPageByFilter(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            filter = filter != null ? filter : new pip_services3_commons_nodex_1.FilterParams();
            let key = filter.getAsNullableString("key");
            paging = paging != null ? paging : new pip_services3_commons_nodex_2.PagingParams();
            let skip = paging.getSkip(0);
            let take = paging.getTake(100);
            let result = [];
            for (let entity of this._entities) {
                if (key != null && key != entity.key)
                    continue;
                skip--;
                if (skip >= 0)
                    continue;
                take--;
                if (take < 0)
                    break;
                result.push(entity);
            }
            return new pip_services3_commons_nodex_3.DataPage(result);
        });
    }
    getOneById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let entity of this._entities) {
                if (id == entity.id) {
                    return entity;
                }
            }
            return null;
        });
    }
    create(correlationId, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entity.id == null) {
                entity.id = pip_services3_commons_nodex_4.IdGenerator.nextLong();
                this._entities.push(entity);
            }
            return entity;
        });
    }
    update(correlationId, newEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < this._entities.length; index++) {
                let entity = this._entities[index];
                if (entity.id == newEntity.id) {
                    this._entities[index] = newEntity;
                    return newEntity;
                }
            }
            return null;
        });
    }
    deleteById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < this._entities.length; index++) {
                let entity = this._entities[index];
                if (entity.id == id) {
                    this._entities.splice(index, 1);
                    return entity;
                }
            }
            return null;
        });
    }
    checkCorrelationId(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return correlationId;
        });
    }
}
exports.DummyController = DummyController;
//# sourceMappingURL=DummyController.js.map