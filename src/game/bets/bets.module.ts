import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';

@Module({
  providers: [BetsService],
  exports: [BetsService],
})
export class BetsModule {}
