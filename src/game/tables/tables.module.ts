import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTable } from './entities/game-table.entity';
import { GameTableDbFactory } from './factories/game-table-db.factory';
import { GameTableRedisFactory } from './factories/game-table-redis.factory';
import { TablesService } from './tables.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameTable])],
  providers: [TablesService, GameTableDbFactory, GameTableRedisFactory],
  exports: [TablesService],
})
export class TablesModule {}
