import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entity/player.entity';
import { PlayerDbFactory } from './factories/player-db.factory';
import { PlayerRedisFactory } from './factories/player-redis.factory';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayersService, PlayerDbFactory, PlayerRedisFactory],
  exports: [PlayersService],
})
export class PlayersModule {}
