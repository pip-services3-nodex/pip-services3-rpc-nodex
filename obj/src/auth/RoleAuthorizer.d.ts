export declare class RoleAuthorizer {
    userInRoles(roles: string[]): (req: any, res: any, next: () => void) => void;
    userInRole(role: string): (req: any, res: any, next: () => void) => void;
    admin(): (req: any, res: any, next: () => void) => void;
}
