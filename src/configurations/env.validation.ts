import { plainToClass } from 'class-transformer';
import { 
	IsBooleanString,
	IsEnum, 
	IsInt, 
	IsLowercase,
	IsNotEmpty,
	IsOptional,
	IsString,
	validateSync, 
	ValidateIf,
	ValidatorOptions,
} from 'class-validator';

import { EnvironmentType } from '../common/constants';

const IF_RABBITMQ_WILL_BE_USED = o => o.USE_RABBITMQ === 'true';
const IF_REDIS_WILL_BE_USED = o => o.USE_REDIS === 'true';

class EnvironmentVariables {
	@IsNotEmpty()
	@IsEnum(EnvironmentType)
	NODE_ENV: EnvironmentType;

	@IsInt()
	PORT: number;

	@IsNotEmpty()
	@IsBooleanString()
	@IsLowercase()
	USE_CONTROLLERS: string;

	@IsNotEmpty()
	@IsBooleanString()
	@IsLowercase()
	USE_RABBITMQ: string;

	@ValidateIf(IF_RABBITMQ_WILL_BE_USED)
	@IsNotEmpty()
	@IsString()
	RABBITMQ_URL: string;

	@ValidateIf(IF_RABBITMQ_WILL_BE_USED)
	@IsNotEmpty()
	@IsString()
	RABBITMQ_LISTEN_TO_QUEUE_NAME: string;

	@IsNotEmpty()
	@IsBooleanString()
	@IsLowercase()
	USE_REDIS: string;

	@ValidateIf(IF_REDIS_WILL_BE_USED)
	@IsNotEmpty()
	@IsString()
	REDIS_HOST: string;

	@ValidateIf(IF_REDIS_WILL_BE_USED)
	@IsNotEmpty()
	@IsInt()
	REDIS_PORT: number;

	@ValidateIf(IF_REDIS_WILL_BE_USED)
	@IsOptional()
	@IsInt()
	REDIS_CACHE_EXPIRY_SECONDS: number;
}

/**
 * https://docs.nestjs.com/techniques/validation
 */
export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToClass(
		EnvironmentVariables,
		config,
		{ 
			enableImplicitConversion: true 
		},
	);

	const validationOptions: ValidatorOptions = {
		skipMissingProperties: false,
		enableDebugMessages: true,
		// skipNullProperties: false,
	};

	const errors = validateSync(validatedConfig, validationOptions);

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}