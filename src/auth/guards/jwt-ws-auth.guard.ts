import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JWT_WS_STRATEGY_NAME, PUBLIC_KEY_FOR_AUTH_GUARD } from 'src/common/constants';
import { UnauthorizedWsException } from 'src/exceptions/unauthorized-ws-exception';

@Injectable()
export class JwtWsAuthGuard extends AuthGuard(JWT_WS_STRATEGY_NAME) {
  constructor(private reflector: Reflector) {
    super();
  }
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_KEY_FOR_AUTH_GUARD,
      [
        context.getHandler(),
        context.getClass,
      ]
    );

    if (isPublic) {
      return true;
    }

    const contextType = context.getType();

    if (contextType !== 'ws') {
      return false;
    }
    
    const wsClient = context.switchToWs().getClient();
    const authToken = wsClient.handshake?.headers?.authorization;

    console.log('auth token', authToken);

    if (!authToken) {
      throw new UnauthorizedWsException();
    }

    return super.canActivate(context);
  }
  
  getRequest(context: ExecutionContext) {
    const contextType = context.getType();

    const ws = context.switchToWs().getClient();
    
    return {
      headers: {
        authorization: ws.handshake?.headers?.authorization,
      },
    };
  }

  handleRequest<TUser = any>(
    err: any, 
    user: any, 
    info: any, 
    context: any, 
    status?: any
  ): TUser {
    console.log('user', user);
    console.log('err', err);
    console.log('info', info);
    console.log('status', status);
    
    if (err || !user) {
        throw err || new UnauthorizedWsException();
    }

    return user;
  }
}
