import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from '../../src/services/CommandableHttpService';

export class DummyCommandableHttpService extends CommandableHttpService {
    public constructor() {
        super('dummy');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-dummies', 'controller', 'default', '*', '*'));
    }

    public register(): void {
        if (!this._swaggerAuto && this._swaggerEnable) {
            this.registerOpenApiSpec("swagger yaml content");
        }

        super.register();
    }
}