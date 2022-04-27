import { join } from 'path';

export const BASE_DIR = join(__dirname, '../');

export const ENV_FILE_PATHS_FROM_MAIN_FILE = [
	join(BASE_DIR, './.env'),
	join(BASE_DIR, './.env.dev'),
	join(BASE_DIR, './.env.local'),
];

export enum EnvironmentType {
	Development = 'development',
	Production = 'production',
	Test = 'test',
	Local = 'local',
}

export enum MicroserviceList {
	DEFAULT = 'DEFAULT',
}

export enum MicroserviceQueueList {}

export const DEFAULT_REDIS_CACHE_EXPIRY_SECONDS = 86400; // one day.