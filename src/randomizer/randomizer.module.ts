import { Global, Module } from '@nestjs/common';
import { RandomizerService } from './randomizer.service';
import { UuidGeneratorService } from './uuid-generator/uuid-generator.service';

@Global()
@Module({
    providers: [RandomizerService, UuidGeneratorService],
    exports: [RandomizerService, UuidGeneratorService],
})
export class RandomizerModule {}
