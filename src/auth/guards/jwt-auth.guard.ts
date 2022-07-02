import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PUBLIC_KEY_FOR_AUTH_GUARD } from "src/common/constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
}