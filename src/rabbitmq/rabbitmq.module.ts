import { Module } from '@nestjs/common';
import { DefaultClientModule } from './default-client/default-client.module';

@Module({
  imports: [DefaultClientModule],
  exports: [DefaultClientModule],
})
export class RabbitmqModule {}
