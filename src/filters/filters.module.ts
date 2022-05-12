import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';
import { GlobalExceptionFilter } from './global-exception.filter';
import { HttpExceptionFilter } from './http-exception.filter';
import { TypeOrmExceptionFilter } from './typeorm-exception.filter';
import { TypeOrmFilter } from './typeorm.filter';

/**
 * REMINDER:
 * reading of exception is from bottom to top. 
 * So, first exception to read is from the bottom. 
 */
@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: TypeOrmExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: TypeOrmFilter,
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        }
    ]
})
export class FiltersModule {}
