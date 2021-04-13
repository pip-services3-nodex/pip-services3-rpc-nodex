/** @module services */
import { ConfigParams } from "pip-services3-commons-nodex";
import { ICommand } from "pip-services3-commons-nodex";
export declare class CommandableSwaggerDocument {
    private content;
    commands: ICommand[];
    version: string;
    baseRoute: string;
    infoTitle: string;
    infoDescription: string;
    infoVersion: string;
    infoTermsOfService: string;
    infoContactName: string;
    infoContactUrl: string;
    infoContactEmail: string;
    infoLicenseName: string;
    infoLicenseUrl: string;
    constructor(baseRoute: string, config: ConfigParams, commands: ICommand[]);
    toString(): string;
    private createPathsData;
    private createRequestBodyData;
    private createSchemaData;
    private createResponsesData;
    protected writeData(indent: number, data: Map<string, any>): void;
    protected writeName(indent: number, name: string): void;
    protected writeArrayItem(indent: number, name: string, isObjectItem?: boolean): void;
    protected writeAsObject(indent: number, name: string, value: any): void;
    protected writeAsString(indent: number, name: string, value: string): void;
    protected getSpaces(length: number): string;
    protected typeToString(type: any): string;
}
