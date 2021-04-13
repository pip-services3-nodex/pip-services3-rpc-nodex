import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class Dummy implements IStringIdentifiable {
	public constructor(id: string, key: string, content: string) {
		this.id = id;
		this.key = key;
		this.content = content;
	}

	public id: string;
	public key: string;
	public content: string;
}