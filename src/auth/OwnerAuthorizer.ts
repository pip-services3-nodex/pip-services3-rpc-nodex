/** @module auth */
import { UnauthorizedException } from 'pip-services3-commons-nodex';
import { HttpResponseSender } from '../services/HttpResponseSender';

export class OwnerAuthorizer {

    public owner(idParam: string = 'user_id'): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    ).withStatus(401)
                );
            } else {
                let userId = req.params[idParam] || req.param(idParam);
                if (req.user_id != userId) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'FORBIDDEN',
                            'Only data owner can perform this operation'
                        ).withStatus(403)
                    );
                } else {
                    next();
                }
            }
        };
    }

    public ownerOrAdmin(idParam: string = 'user_id'): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    ).withStatus(401)
                );
            } else {
                let userId = req.params[idParam] || req.param(idParam);
                let roles: string[] = req.user != null ? req.user.roles : null;
                roles = roles || [];
                let admin = roles.includes('admin');
                if (req.user_id != userId && !admin) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'FORBIDDEN',
                            'Only data owner can perform this operation'
                        ).withStatus(403)
                    );
                } else {
                    next();
                }
            }
        };
    }

}
