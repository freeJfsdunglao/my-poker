import { Cache } from "cache-manager";
import { RedisStore } from "./redis-store.interface";

export interface RedisCache extends Cache {
    store: RedisStore;
}