import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RedisModule } from './redis/redis.module';
import { RandomizerModule } from './randomizer/randomizer.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    ConfigurationsModule, 
    RabbitmqModule, 
    RedisModule, 
    RandomizerModule, 
    SchedulerModule, TypeormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}
