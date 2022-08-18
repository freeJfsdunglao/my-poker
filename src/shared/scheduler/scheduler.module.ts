import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { RandomizerModule } from 'src/apps/randomizer/randomizer.module';

@Module({
    imports: [
        NestScheduleModule.forRoot(),
        RandomizerModule,
    ],
    providers: [SchedulerService],
})
export class SchedulerModule {}
