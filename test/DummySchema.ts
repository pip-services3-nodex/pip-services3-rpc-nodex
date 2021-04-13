import { TypeCode } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';

export class DummySchema extends ObjectSchema {

    public constructor() {
        super();
        this.withOptionalProperty("id", TypeCode.String);
        this.withRequiredProperty("key", TypeCode.String);
        this.withOptionalProperty("content", TypeCode.String);
    }

}
