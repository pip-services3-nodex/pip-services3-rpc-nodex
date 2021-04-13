/** @module auth */
import { UnauthorizedException } from 'pip-services3-commons-nodex';
import { HttpResponseSender } from '../services/HttpResponseSender';

export class RoleAuthorizer {

    public userInRoles(roles: string[]): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    ).withStatus(401)
                );
            } else {
                let authorized = false;
                user.roles = user.roles || [];
                
                for (let role of roles)
                    authorized = authorized || user.roles.includes(role);

                if (!authorized) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'NOT_IN_ROLE',
                            'User must be ' + roles.join(' or ') + ' to perform this operation'
                        ).withDetails('roles', roles).withStatus(403)
                    );
                } else {
                    next();
                }
            }
        };
    }

    public userInRole(role: string): (req: any, res: any, next: () => void) => void {
        return this.userInRoles([role]);
    }
        
    public admin(): (req: any, res: any, next: () => void) => void {
        return this.userInRole('admin');
    }

}
