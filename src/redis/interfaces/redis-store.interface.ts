import { Store } from "cache-manager";
import Redis from 'redis';

export interface RedisStore extends Store {
	name: 'redis';
	getClient: () => Redis.RedisClient;
	isCacheableValue: (value: any) => boolean; 
}