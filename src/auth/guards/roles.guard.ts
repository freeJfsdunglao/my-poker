import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { KEY_FOR_ROLES_GUARD, Role } from 'src/common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      KEY_FOR_ROLES_GUARD,
      [
        context.getHandler(),
        context.getClass(),
      ]
    );

    if (!requiredRoles) {
      return true;
    }
    
    const user = context.switchToHttp().getRequest();
    const isValid = requiredRoles.some((role) => user.roles?.includes(role));
    
    return isValid;
  }
}
