import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigurationsService } from './configurations.service';

import { ENV_FILE_PATHS_FROM_MAIN_FILE } from '../common/constants';
import { validate } from './env.validation';

/**
 * DOCUMENTATION: https://docs.nestjs.com/techniques/configuration
 */
@Global() // <<--- isGlobal: true is not needed since we have custom ConfigurationsService;
@Module({
	imports: [
		NestConfigModule.forRoot({
			envFilePath: ENV_FILE_PATHS_FROM_MAIN_FILE,
			// isGlobal: true,
			expandVariables: true,
			ignoreEnvFile: false,
			validate
		}),
	],
	providers: [ConfigurationsService],
	exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
