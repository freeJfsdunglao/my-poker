import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { RandomizerService } from '../randomizer/randomizer.service';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);
    
    constructor(
        private readonly randomizerService: RandomizerService,
    ) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
	public async handleEntropyGenerator(): Promise<void> {
		this.logger.debug('Scheduled entropy generator processing..');
		await this.randomizerService.generateEntropyKeyUsingDevUrandom();
		this.logger.debug('Entropy generator done.');
	}
}
