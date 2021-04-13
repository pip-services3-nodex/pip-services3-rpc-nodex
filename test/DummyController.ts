import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { IDummyController } from './IDummyController';
import { DummyCommandSet } from './DummyCommandSet';
import { Dummy } from './Dummy';

export class DummyController implements IDummyController, ICommandable {
	private _commandSet: DummyCommandSet;
	private readonly _entities: Dummy[] = [];

	public getCommandSet(): CommandSet {
		if (this._commandSet == null)
			this._commandSet = new DummyCommandSet(this);
		return this._commandSet;
	}

	public async getPageByFilter(correlationId: string, filter: FilterParams,
		paging: PagingParams): Promise<DataPage<Dummy>> {
			
		filter = filter != null ? filter : new FilterParams();
		let key: string = filter.getAsNullableString("key");

		paging = paging != null ? paging : new PagingParams();
		let skip: number = paging.getSkip(0);
		let take: number = paging.getTake(100);

		let result: Dummy[] = [];
		for (let entity of this._entities) {
			if (key != null && key != entity.key)
				continue;

			skip--;
			if (skip >= 0) continue;

			take--;
			if (take < 0) break;

			result.push(entity);
		}

		return new DataPage<Dummy>(result);
	}

	public async getOneById(correlationId: string, id: string): Promise<Dummy> {
		for (let entity of this._entities) {
			if (id == entity.id) {
				return entity;
			}
		}
		return null;
	}

	public async create(correlationId: string, entity: Dummy): Promise<Dummy> {
		if (entity.id == null) {
			entity.id = IdGenerator.nextLong();
			this._entities.push(entity);
		}
		return entity;
	}

	public async update(correlationId: string, newEntity: Dummy): Promise<Dummy> {
		for (let index = 0; index < this._entities.length; index++) {
			let entity: Dummy = this._entities[index];
			if (entity.id == newEntity.id) {
				this._entities[index] = newEntity;
				return newEntity;
			}
		}
		return null;
	}

	public async deleteById(correlationId: string, id: string): Promise<Dummy> {
		for (let index = 0; index < this._entities.length; index++) {
			let entity: Dummy = this._entities[index];
			if (entity.id == id) {
				this._entities.splice(index, 1);
				return entity;
			}
		}
		return null;
	}

	public async checkCorrelationId(correlationId: string): Promise<string> {
		return correlationId;
	}
}