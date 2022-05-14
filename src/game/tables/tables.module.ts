import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';

@Module({
  providers: [TablesService]
})
export class TablesModule {}
