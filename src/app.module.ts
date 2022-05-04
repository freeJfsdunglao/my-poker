import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RedisModule } from './redis/redis.module';
import { RandomizerModule } from './randomizer/randomizer.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { LoggerModule } from './logger/logger.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigurationsModule, 
        RabbitmqModule, 
        RedisModule, 
        RandomizerModule, 
        SchedulerModule, 
        TypeormModule, 
        LoggerModule, 
        UsersModule, 
        AuthModule, 
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        }
    ],
})
export class ApplicationModule {}
