import { CacheModule, Module, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { ConfigurationsService } from '../configurations/configurations.service';
import { RedisService } from './redis.service';

import { DEFAULT_REDIS_CACHE_EXPIRY_SECONDS } from '../common/constants';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigurationsService],
      useFactory: async (config: ConfigurationsService) => ({
        ttl: config.redisExpiry || DEFAULT_REDIS_CACHE_EXPIRY_SECONDS,
        store: redisStore,
        socket: {
          host: config.redisHost,
          port: config.redisPort,
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
