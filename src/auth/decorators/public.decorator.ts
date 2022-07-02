import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY_FOR_AUTH_GUARD } from 'src/common/constants';

export const Public = (...args: string[]) => SetMetadata(PUBLIC_KEY_FOR_AUTH_GUARD, args);
