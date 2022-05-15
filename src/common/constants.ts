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

export enum RoundName {
	START = 'start',
	PRE_FLOP = 'pre-flop',
	FLOP = 'flop',
	TURN = 'turn',
	RIVER = 'river',
	SHOWDOWN = 'showdown',
	WAITING = 'waiting',
}

export enum BetAction {
	BLIND = 'blind',
	CALL = 'call',
	BET = 'bet',
	RAISE = 'raise',
	FOLD = 'fold',
	CHECK = 'check',
}

export enum PlayerStatus {
	SIT_OUT = 'sit_out',
	PLAYING = 'playing',
	FOLDED = 'folded',
	DISCONNECTED = 'disconnected',
}

export enum PlayerType {
	DEALER = 'dealer',
	SMALL_BLIND = 'small-blind',
	BIG_BLIND = 'big-blind',
	PLAYER = 'player',
}

export enum TableType {
	TEXAS_HOLDEM = 'texas-holdem',
}

export const DEFAULT_REDIS_CACHE_EXPIRY_SECONDS = 86400; // one day.

export const LOG_DATETIME_FORMAT = 'MM/DD/YYYY, h:mm:ss A';
export const DEBUGGING_LOG_NAME = 'Winston';
export const DEFAULT_LOG_CONTEXT = 'AnonymousContext';
export const DEFAULT_LOG_LEVEL = 'silly';

export enum INITIAL_WEBSOCKET_ROOMS {
	NOTIFICATIONS = 'notifications',
}

export const WEBSOCKET_GAME_NAMESPACE = '/game';

export const WS_EXCEPTION_NO_SERVER = 'WS_NO_SERVER_ERROR_CODE';

