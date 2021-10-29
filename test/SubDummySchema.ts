import { TypeCode } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';

export class SubDummySchema extends ObjectSchema {

    public constructor() {
        super();
        this.withRequiredProperty("key", TypeCode.String);
        this.withOptionalProperty("content", TypeCode.String);
    }

}
