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

@Module({
    imports: [
        ConfigurationsModule, 
        RabbitmqModule, 
        RedisModule, 
        RandomizerModule, 
        SchedulerModule, 
        TypeormModule, 
        LoggerModule, 
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        }
    ],
})
export class ApplicationModule {}
