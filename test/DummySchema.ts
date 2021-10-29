import { TypeCode } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { SubDummySchema } from './SubDummySchema';

export class DummySchema extends ObjectSchema {

    public constructor() {
        super();
        this.withOptionalProperty("id", TypeCode.String);
        this.withRequiredProperty("key", TypeCode.String);
        this.withOptionalProperty("content", TypeCode.String);
        this.withOptionalProperty("array", new ArraySchema(new SubDummySchema()));
    }
}
