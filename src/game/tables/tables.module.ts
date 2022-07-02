import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTable } from './entities/game-table.entity';
import { GameTableFactory } from './factories/game-table.factory';
import { TablesService } from './tables.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameTable])],
  providers: [TablesService, GameTableFactory],
  exports: [TablesService],
})
export class TablesModule {}
