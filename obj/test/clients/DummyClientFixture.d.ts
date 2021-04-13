import { IDummyClient } from './IDummyClient';
export declare class DummyClientFixture {
    private _client;
    constructor(client: IDummyClient);
    testCrudOperations(): Promise<void>;
}
