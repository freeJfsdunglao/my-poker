import { Injectable } from "@nestjs/common";
import { DEFAULT_REDIS_CACHE_EXPIRY_SECONDS } from "src/common/constants";
import { RedisService } from "src/redis/redis.service";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { PlayerDto } from "../dtos/player.dto";

@Injectable()
export class PlayerRedisFactory {
    constructor(
        private readonly redisService: RedisService,
    ) {}

    public async createInitialGameTablePlayers(key: string): Promise<PlayerDto[]> {
        return await this.redisService.setGetJson<PlayerDto[]>(key, '$', []);
    }

    public async saveJson(
        key: string, 
        path: string = '$', 
        jsonData: CreatePlayerDto, 
        ttl: number = DEFAULT_REDIS_CACHE_EXPIRY_SECONDS
    ): Promise<void> {
        return await this.redisService.setJson(key, path, jsonData, ttl);
    }

    public async appendPlayer(
        key: string,
        path: string = '$',
        jsonData: PlayerDto
    ): Promise<PlayerDto[]> {
        return await this.redisService.jsonArrayAppend(key, path, jsonData);
    }

    public async getCache(key: string): Promise<PlayerDto[]> {
        return await this.redisService.getFullJson<PlayerDto[]>(key);
    }
}