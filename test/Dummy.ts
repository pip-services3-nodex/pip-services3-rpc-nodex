import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { SubDummy } from './SubDummy';

export class Dummy implements IStringIdentifiable {
	public constructor(id: string, key: string, content: string, array: Array<SubDummy>) {
		this.id = id;
		this.key = key;
		this.content = content;
		this.array = array;
	}

	public id: string;
	public key: string;
	public content: string;
	public array: Array<SubDummy>;
}