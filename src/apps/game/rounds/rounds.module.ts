import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';

@Module({
  providers: [RoundsService],
  exports: [RoundsService],
})
export class RoundsModule {}
