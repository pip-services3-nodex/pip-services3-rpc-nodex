export declare class OwnerAuthorizer {
    owner(idParam?: string): (req: any, res: any, next: () => void) => void;
    ownerOrAdmin(idParam?: string): (req: any, res: any, next: () => void) => void;
}
