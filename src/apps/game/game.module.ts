import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PlayersModule } from './players/players.module';
import { BetsModule } from './bets/bets.module';
import { ChipsModule } from './chips/chips.module';
import { CardsModule } from './cards/cards.module';
import { RoundsModule } from './rounds/rounds.module';
import { PotsModule } from './pots/pots.module';
import { ConnectionsModule } from './connections/connections.module';
import { TimersModule } from './timers/timers.module';
import { TablesModule } from './tables/tables.module';
import { GameGateway } from './game.gateway';

@Module({
  controllers: [GameController],
  providers: [GameService, GameGateway],
  imports: [
    PlayersModule, 
    BetsModule, 
    ChipsModule, 
    CardsModule, 
    RoundsModule, 
    PotsModule, 
    ConnectionsModule, 
    TimersModule, 
    TablesModule
  ]
})
export class GameModule {}
