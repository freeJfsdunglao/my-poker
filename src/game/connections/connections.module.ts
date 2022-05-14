import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';

@Module({
  providers: [ConnectionsService]
})
export class ConnectionsModule {}
