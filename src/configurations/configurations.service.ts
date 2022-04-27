import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationsService {
	private readonly TRUE = 'true';

	constructor(private readonly configService: ConfigService) {}

	/**
	 * DOCUMENTATION: https://docs.nestjs.com/techniques/configuration#custom-getter-functions
	 */
	get willUseRabbitMQMicroservice(): boolean {
		return this.configService.get('USE_RABBITMQ') === this.TRUE;
	}

	get willUseControllers(): boolean {
		return this.configService.get('USE_CONTROLLERS') === this.TRUE;
	}

	get portNumber(): number {
		return this.configService.get('PORT');
	}

	get applicationLevel(): string {
		return this.configService.get('NODE_ENV');
	}

	get rabbitMQURL(): string {
		return this.configService.get('RABBITMQ_URL');
	}

	get rabbitMQListeningQueueName(): string {
		return this.configService.get('RABBITMQ_LISTEN_TO_QUEUE_NAME');
	}

	get willUseRedisCaching(): boolean {
		return this.configService.get('USE_REDIS') === this.TRUE;
	}

	get redisHost(): string {
		return this.configService.get('REDIS_HOST');
	}

	get redisPort(): number {
		return this.configService.get('REDIS_PORT');
	}

	get redisExpiry(): number {
		return this.configService.get('REDIS_CACHE_EXPIRY_SECONDS');
	}
}
