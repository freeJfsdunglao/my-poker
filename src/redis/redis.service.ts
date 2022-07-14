import { 
	CACHE_MANAGER, 
	Inject, 
	Injectable,
	Logger
} from '@nestjs/common';

import { ConfigurationsService } from '../configurations/configurations.service';
import { 
	DEFAULT_REDIS_CACHE_EXPIRY_SECONDS, 
	EnvironmentType, 
	RedisCommand 
} from '../common/constants';
import { RedisCache } from './interfaces/redis-cache.interface';

@Injectable()
export class RedisService {
	private readonly logger = new Logger(RedisService.name);

	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache,
		private readonly config: ConfigurationsService,
	) {
		if (config.applicationLevel !== EnvironmentType.Production) {
			this.testCaching();
			this.furtherTestCaching(50);
		}

		this.anotherTesting();
	}

	public get manager() {
		return this.cacheManager;
	}

	public get client() {
		return this.cacheManager.store.getClient();
	}

	public async useCommand<T>(command: RedisCommand, params: string[]): Promise<T> {
		return await new Promise<T>((resolve, reject) => {
			this.client.send_command(
				command,
				params,
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(reply);
				}
			);
		});
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

		this.scanDeleteCache(testCacheKey);
	}

	public async anotherTesting(): Promise<void> {
		await this.setCache('sample', { 'hello': 'world' });
		const data = await this.getCache('sample');
	}

	public async furtherTestCaching(times: number): Promise<void> {
		for (let i = 0; i < times; i++) {
			const testKey = `hello:another:world:${i}`;
			const testData = {
				iterateNumber: i,
				author: 'John Florentino D. Dunglao',
				description: 'This test is specifically made for the scan function',
			};

			await this.setCache(testKey, testData);
		}

		const scannedKeys = await this.scanForKeys('hello:another:world:*');

		this.logger.debug(JSON.stringify(scannedKeys));
		
		for (const scanned of scannedKeys) {
			this.deleteCache(scanned);
		}

		this.deleteCache('this:is:an:unexisting:key:check:if:no:error');
	}

	public async getCache<T>(key: string): Promise<T> {
		return await this.cacheManager.get<T>(key);
	}

	public async setCache(key: string, data: Object | string): Promise<void> {
		await this.cacheManager.set(key, data);
	}

	public async scanForKeys(pattern: string): Promise<string[]> {
		this.logger.debug('RUNNING SCAN FOR KEYS', pattern);
		
		const scanFullResult = [];

		await new Promise(async (resolve, reject): Promise<void> => {
			const scannerFunction = async (cursorNumber: string) => {
				this.client.scan(
					cursorNumber,
					'MATCH',
					pattern,
					(err, reply) => {
						if (err) {
							reject(new Error(err.message));
						}

						scanFullResult.push(...reply[1]);
						
						if (reply[0] !== '0') {
							scannerFunction(reply[0]);
							return;
						}

						this.logger.debug('Redis scanner working perfectly ¯\\_(ツ)_/¯');
						resolve({});
					},
				);
			};

			await scannerFunction('0');
		});

        return [...new Set(scanFullResult)];
	}

	public async scanDeleteCache(pattern: string): Promise<void> {
		const deleteKeys = await this.scanForKeys(pattern);

		for (const key of deleteKeys) {
			await this.deleteCache(key);
		}
	}

	public async deleteCache(keyName: string): Promise<void> {
		await this.cacheManager.del(keyName);
	}

	public async getPartialJson<T>(key: string, path: string | string[]): Promise<T> {
		if (typeof path === 'string') {
			path = [path];
		}
		
		return await new Promise<T>((resolve, reject) => {
			this.client.send_command<T>(
				RedisCommand.JsonGet,
				[
					key,
					...path,
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(reply);
				}
			);
		});
	}

	public async getFullJson<T>(key: string): Promise<T> {
		return await this.getPartialJson(key, '$');
	}

	public async setJson(
		key: string, 
		path: string, 
		data: Object,
		ttl: number = DEFAULT_REDIS_CACHE_EXPIRY_SECONDS
	): Promise<void> {
		await new Promise<void>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.JsonSet,
				[
					key, 
					path, 
					JSON.stringify(data),
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					console.log('set data reply', reply);
					
					resolve();
				}
			);
		});

		await new Promise<void>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.Expire,
				[
					key,
					ttl
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					console.log('set expiry on data reply', reply);
					
					resolve();
				}
			);
		});
	}

	public async setGetJson<T>(
		key: string, 
		path: string, 
		data: Object,
		ttl: number = DEFAULT_REDIS_CACHE_EXPIRY_SECONDS
	): Promise<T> {
		await this.setJson(key, path, data, ttl);
		return await this.getFullJson<T>(key);
	}

	public async jsonArrayAppend<T>(
		key: string,
		path: string,
		data: Object,
	): Promise<T> {
		return await new Promise<T>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.JsonAppend,
				[
					key,
					path,
					JSON.stringify(data),
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(reply);
				}
			);
		});
	}

	public async setAdd(key: string, value: string): Promise<void> {
		await new Promise<void>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.SetAdd,
				[
					key,
					value,
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve();
				}
			);
		});
	}

	public async setCount(key: string, value: string): Promise<number> {
		return await new Promise<number>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.SetCard,
				[ key ],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(reply);
				}
			);
		});
	}

	public async isSetMember(key: string, value: string): Promise<boolean> {
		return await new Promise<boolean>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.SetIsMember,
				[
					key,
					value,
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(!!reply);
				}
			);
		});
	}

	public async getRandomMember(
		key: string, 
		count: number = 1
	): Promise<string | string[]> {
		return await new Promise<string | string[]>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.SetRandomMember,
				[
					key,
					count,
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(reply);
				}
			);
		});
	}

	public async scanSetForKey(key: string, pattern: string): Promise<string[]> {
		const scanFullResult = [];
		
		await new Promise<void>(async (resolve, reject): Promise<void> => {
			const scannerFunction = async (cursorNumber: string) => {
				this.client.send_command(
					RedisCommand.SetScan,
					[
						key,
						cursorNumber, 
						'MATCH',
						pattern,
					],
					(err, reply) => {
						if (err) {
							reject(err);
							return;
						}

						scanFullResult.push(...reply[1]);

						if (reply[0] !== '0') {
							scannerFunction(reply[0]);
						}

						resolve();
					}
				);
			};

			await scannerFunction('0');
		});

		return [...new Set(scanFullResult)];
	}

	public async setRemove(key: string, value: string): Promise<boolean> {
		return await new Promise<boolean>((resolve, reject) => {
			this.client.send_command(
				RedisCommand.SetRemove,
				[
					key,
					value,
				],
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}

					resolve(!!reply);
				}
			);
		});
	}
}
