import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RedisCommand } from "src/common/constants";
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
    ) {

    }
    
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
        jsonData: UpdateGameTableDto
    ): Promise<void> {
        return await this.redisService.useCommand(
            RedisCommand.JsonSet,
            [
                key,
                path,
                JSON.stringify(jsonData),
            ]
        );
        // return await this.redisService.json.set(key, path, jsonData);
        // console.log(this.redisService.client.send_command());
        // return await this.redisService.manager.store.getClient().json(key, path, jsonData);
    }

    async getJson(key: string): Promise<GameTableDto> {
        return await this.redisService.useCommand<GameTableDto>(
            RedisCommand.JsonGet,
            [
                key,
                '$'
            ]
        );
        // return await this.redisService.client.call('JSON.GET', key, '$');
        // return await this.redisService.json.get(key, { path: '$' });
    }
    
    async getPartialJson(key: string, path: string | string[]): Promise<PartialGameTable> {
        if (Array.isArray(path) === true) {
            path = (path as string[]).join(' ');
        }
        
        return await this.redisService.useCommand<PartialGameTable>(
            RedisCommand.JsonGet,
            [
                key,
                (path as string),
            ]
        );
        // return await this.redisService.json.get(key, { path });
        // return await this.redisService.client.call('JSON.SET', key, ...path);
    }
}