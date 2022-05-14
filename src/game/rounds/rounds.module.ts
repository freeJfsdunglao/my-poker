import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';

@Module({
  providers: [RoundsService]
})
export class RoundsModule {}
