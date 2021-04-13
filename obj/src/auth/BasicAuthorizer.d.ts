export declare class BasicAuthorizer {
    anybody(): (req: any, res: any, next: () => void) => void;
    signed(): (req: any, res: any, next: () => void) => void;
}
