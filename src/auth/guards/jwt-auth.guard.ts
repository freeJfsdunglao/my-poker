import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { JWT_STRATEGY_NAME, PUBLIC_KEY_FOR_AUTH_GUARD } from "src/common/constants";
import { UnauthorizedWsException } from "src/exceptions/unauthorized-ws-exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_NAME) {
    constructor(private reflector: Reflector) {
        super();
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('pumasok na ba dito');
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            PUBLIC_KEY_FOR_AUTH_GUARD,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        if (isPublic) {
            return true;
        }
        
        const contextType = context.getType();

        if (contextType === 'ws') {
            const wsClient = context.switchToWs().getClient();
            const authToken = wsClient.handshake?.authorization;

            if (!authToken) {
                throw new UnauthorizedWsException();
            }
            
            const req = {
                headers: {
                    authorization: authToken,
                },
            };

            console.log('fake shit', req);

            return super.canActivate(new ExecutionContextHost([req]));
        }

        return super.canActivate(context);
    }

    handleRequest<TUser = any>(
        err: any, 
        user: any, 
        info: any, 
        context: any, 
        status?: any
    ): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        return user;
    }

    getRequest(context: ExecutionContext) {
        const contextType = context.getType();

        console.log('context', context);

        if (contextType === 'ws') {
            const ws = context.switchToWs().getClient();
            console.log('ws context', ws);
            return {
                headers: {
                    authorization: 'wtf',
                }
            }
        }
        
        return context.switchToHttp().getRequest();
    }
}