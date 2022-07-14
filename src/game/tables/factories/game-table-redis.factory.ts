import { Injectable } from "@nestjs/common";
import { CachePrefixSuffix, DEFAULT_REDIS_CACHE_EXPIRY_SECONDS } from "src/common/constants";
import { RedisService } from "src/redis/redis.service";
import { CreateGameTableDto } from "../dtos/create-game-table.dto";
import { GameTableDto } from "../dtos/game-table.dto";
import { PartialGameTable } from "../dtos/partial-game-table.dto";
import { UpdateGameTableDto } from "../dtos/update-game-table.dto";

@Injectable()
export class GameTableRedisFactory {
    constructor(
        private readonly redisService: RedisService,
    ) {}

    async saveToRedis(key: string, dto: CreateGameTableDto): Promise<void> {
        await this.redisService.manager.set(key, dto);
    }

    async fetchCached(key: string): Promise<GameTableDto> {
        return await this.redisService.manager.get<GameTableDto>(key);
    }

    async saveJson(
        key: string, 
        path: string = '$', 
        jsonData: UpdateGameTableDto,
        ttl: number = DEFAULT_REDIS_CACHE_EXPIRY_SECONDS
    ): Promise<void> {
        return await this.redisService.setJson(key, path, jsonData, ttl);
    }

    async getJson(key: string): Promise<GameTableDto> {
        return await this.redisService.getFullJson<GameTableDto>(key);
    }
    
    async getPartialJson(key: string, path: string | string[]): Promise<PartialGameTable> {
        return await this.redisService.getPartialJson<PartialGameTable>(key, path);
    }

    async setGetJson(
        key: string, 
        path: string = '$', 
        jsonData: UpdateGameTableDto,
        ttl: number = DEFAULT_REDIS_CACHE_EXPIRY_SECONDS
    ): Promise<GameTableDto> {
        return this.redisService.setGetJson<GameTableDto>(key, path, jsonData, ttl);
    }

    async deleteInCache(key: string): Promise<void> {
        await this.redisService.deleteCache(key);
    }

    async getRandomTableKey(): Promise<string> {
        const rMem =  await this.redisService.getRandomMember(CachePrefixSuffix.AvailableTables);
        let member: string = Array.isArray(rMem) === true 
            ? (rMem as string[]).pop() 
            : (rMem as string);

        return member;
    }
}