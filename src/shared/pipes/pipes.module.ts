import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validation.pipe';

/**
 * Note:
 * reading of exception is from bottom to top. 
 * the reading pipe direction is not sure. maybe the same.
 */
@Module({
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
    ],
})
export class PipesModule {}
