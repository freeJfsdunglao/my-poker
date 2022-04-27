import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigurationsModule, RabbitmqModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}
