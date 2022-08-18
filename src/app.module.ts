import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RandomizerModule } from 'src/apps/randomizer/randomizer.module';
import { UsersModule } from 'src/apps/users/users.module';
import { AuthModule } from 'src/apps/auth/auth.module';
import { GameModule } from 'src/apps/game/game.module';

import { ConfigurationsModule } from 'src/shared/configurations/configurations.module';
import { RabbitmqModule } from 'src/shared/rabbitmq/rabbitmq.module';
import { RedisModule } from 'src/shared/redis/redis.module';
import { SchedulerModule } from 'src/shared/scheduler/scheduler.module';
import { TypeormModule } from 'src/shared/typeorm/typeorm.module';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { FiltersModule } from 'src/shared/filters/filters.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { InterceptorsModule } from 'src/shared/interceptors/interceptors.module';
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
