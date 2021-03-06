import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigurationsModule } from './configurations/configurations.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RedisModule } from './redis/redis.module';
import { RandomizerModule } from './randomizer/randomizer.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FiltersModule } from './filters/filters.module';
import { PipesModule } from './pipes/pipes.module';
import { GameModule } from './game/game.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
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
        FiltersModule, 
        PipesModule, 
        GameModule, 
        InterceptorsModule, 
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class ApplicationModule {}
