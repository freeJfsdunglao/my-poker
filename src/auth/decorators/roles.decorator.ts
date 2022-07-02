import { SetMetadata } from '@nestjs/common';
import { KEY_FOR_ROLES_GUARD, Role } from 'src/common/constants';

export const Roles = (...roles: Role[]) => SetMetadata(KEY_FOR_ROLES_GUARD, roles);
