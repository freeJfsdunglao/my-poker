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

export const EXCEPTION = 'exception';
export enum ErrorCode {
	ACTION_UNAVAILABLE = 'BV001',
	INVALID_CHIP_AMOUNT = 'BV002',
	UUID_NOT_GENERATED = 'SYS000',
}

/**
 * Reference for accepted values.
 * https://github.com/vercel/ms
 */
export const JWT_EXPIRATION = '60s';

export const PUBLIC_KEY_FOR_AUTH_GUARD = process.env['JWT_PUBLIC_KEY'] || '';
export const KEY_FOR_ROLES_GUARD = process.env['ROLES_KEY'] || '';

export enum Role {
	User = 'user',
	Admin = 'admin',
	SuperAdmin = 'superadmin',
	Moderator = 'moderator',
}

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;

export enum TimeoutMs {
	AutoFold = 30 * SECOND,
	SitOut = 5 * MINUTE,
	TimerBeforeStart = 10 * SECOND,
}

export enum Delay {}

export enum Blind {
	Twenty = 20,
	Fourty = 40,
	Fifty = 50,
}

export const DEFAULT_SEAT_LIMIT = 9;
export const DEFAULT_PLAYERS_TO_START = 2;
export const MAX_SEAT_LIMIT = 14;
export const DEFAULT_BLIND_AMOUNT = Blind.Twenty;
