import { 
	CACHE_MANAGER, 
	Inject, 
	Injectable,
	Logger
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { ConfigurationsService } from '../configurations/configurations.service';

import { EnvironmentType } from '../common/constants';

@Injectable()
export class RedisService {
	private readonly logger = new Logger(RedisService.name);

	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly config: ConfigurationsService,
	) {
		if (config.applicationLevel !== EnvironmentType.Production) {
			this.testCaching();
		}
	}

	public async testCaching(): Promise<void> {
		const testCacheKey = 'hello:world';
		const testCacheData = {
			author: 'John Florentino D. Dunglao',
			description: 'A freelance website developer at your service anytime',
		};

		await this.setCache(testCacheKey, testCacheData);
		const getTestCached = await this.getCache(testCacheKey);

		this.logger.debug('Test Caching Result', getTestCached);

		this.deleteCache(testCacheKey);
	}

	public async getCache(key: string): Promise<Cache> {
		return await this.cacheManager.get(key);
	}

	public async setCache(key: string, data: Object|string): Promise<Cache> {
		return await this.cacheManager.set(key, data);
	}

	public async scanForKeys(pattern: string): Promise<string[]> {
		const { err, reply } = await new Promise(async (resolve, reject) => {
			this.cacheManager.store.getClient().scan(
				'0', // <-- cursor
				'match',
				pattern,
				(err, reply) => {
					if (err) {
						reject(new Error(err.message));
					}

					resolve({ err, reply: reply[1] }); // <-- [0] contains the count
				}
			);
		});

		if (err) {
			throw new Error(err.message);
		}

		return reply;
	}

	public async deleteCache(pattern: string): Promise<void> {
		const deleteKeys = await this.scanForKeys(pattern);

		for (const key of deleteKeys) {
			await this.cacheManager.del(key);
		}
	}
}
