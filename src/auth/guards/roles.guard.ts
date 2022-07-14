import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { KEY_FOR_ROLES_GUARD, PUBLIC_KEY_FOR_AUTH_GUARD, Role } from 'src/common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextHandler = context.getHandler();
    const contextClass = context.getClass();
    
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_KEY_FOR_AUTH_GUARD,
      [
        contextHandler,
        contextClass,
      ]
    );

    if (isPublic) {
      return true;
    }
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      KEY_FOR_ROLES_GUARD,
      [
        contextHandler,
        contextClass,
      ]
    );

    const { user } = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }

    if (!user) {
      return false;
    }

    const isValid = requiredRoles.some((role) => user.roles?.includes(role));
    
    return isValid;
  }
}
