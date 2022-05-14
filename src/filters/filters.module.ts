import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';
import { HttpExceptionsFilter } from './http-exception.filter';
import { TypeOrmExceptionsFilter } from './typeorm-exception.filter';
import { ValidationExceptionsFilter } from './validation-exception.filter';

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
            useClass: HttpExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: TypeOrmExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: ValidationExceptionsFilter,
        },
    ],
})
export class FiltersModule {}
