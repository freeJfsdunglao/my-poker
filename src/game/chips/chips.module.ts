import { Module } from '@nestjs/common';
import { ChipsService } from './chips.service';

@Module({
  providers: [ChipsService]
})
export class ChipsModule {}
