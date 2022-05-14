import { Module } from '@nestjs/common';
import { ChipsService } from './chips.service';

@Module({
  providers: [ChipsService],
  exports: [ChipsService],
})
export class ChipsModule {}
