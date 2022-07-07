import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CachePrefix, DEFAULT_REDIS_CACHE_EXPIRY_SECONDS } from "src/common/constants";
import { RedisService } from "src/redis/redis.service";
import { Repository } from "typeorm";
import { CreateGameTableDto } from "../dtos/create-game-table.dto";
import { GameTableDto } from "../dtos/game-table.dto";
import { PartialGameTable } from "../dtos/partial-game-table.dto";
import { UpdateGameTableDto } from "../dtos/update-game-table.dto";
import { GameTable } from "../entities/game-table.entity";

@Injectable()
export class GameTableFactory {
    constructor(
        @InjectRepository(GameTable)
        private readonly gameTableRepository: Repository<GameTable>,
        private readonly redisService: RedisService,
    ) {}
    
    create(dto: CreateGameTableDto): GameTableDto {
        const defaultTable = {
            uuid: dto.uuid,
            inProgress: false,
            blindAmount: dto.blindAmount,
            currentRound: dto.currentRound,
            timeoutBeforeAutoFold: dto.timeoutBeforeAutoFold,
            timeoutBeforeAutoSitOut: dto.timeoutBeforeAutoSitOut,
            timeoutBeforeGameStart: dto.timeoutBeforeGameStart,
            seatLimit: dto.seatLimit,
            type: dto.type,
            minimumPlayers: dto.minimumPlayers,
            gamesPlayed: dto.gamesPlayed,
            currentTurnId: dto.currentTurnId,
            lastBettor: dto.lastBettor,
            dealerId: dto.dealerId,
            isPrivate: dto.isPrivate,
            password: dto.password,
        };
        
        return defaultTable;
    }

    async saveToDatabase(dto: CreateGameTableDto): Promise<GameTable> {
        return await this.gameTableRepository.save({
            uuid: dto.uuid,
            type: dto.type,
            blindAmount: dto.blindAmount,
            seatLimit: dto.seatLimit,
            isPrivate: dto.isPrivate,
        });
    }

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
        const rMem =  await this.redisService.getRandomMember(CachePrefix.AvailableTables);
        let member: string = Array.isArray(rMem) === true 
            ? (rMem as string[]).pop() 
            : (rMem as string);

        return member;
    }
}