import { Module } from '@nestjs/common';
import { RandomizerService } from './randomizer.service';

@Module({
    providers: [RandomizerService],
    exports: [RandomizerService],
})
export class RandomizerModule {}
