import { SetMetadata } from '@nestjs/common';
import { KEY_FOR_ROLES_GUARD, Role } from 'src/shared/common/constants';

export const Roles = (...roles: Role[]) => SetMetadata(KEY_FOR_ROLES_GUARD, roles);
