import { Module } from '@nestjs/common';
import { PotsService } from './pots.service';

@Module({
  providers: [PotsService]
})
export class PotsModule {}
