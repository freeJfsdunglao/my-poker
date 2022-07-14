import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CachePrefixSuffix } from 'src/common/constants';
import { CreateGameTableDto } from './dtos/create-game-table.dto';
import { GameTableDto } from './dtos/game-table.dto';
import { UpdateGameTableDto } from './dtos/update-game-table.dto';
import { GameTableDbFactory } from './factories/game-table-db.factory';
import { GameTableRedisFactory } from './factories/game-table-redis.factory';

@Injectable()
export class TablesService {
    constructor(
        private readonly gameTableDbFactory: GameTableDbFactory,
        private readonly gameTableRedisFactory: GameTableRedisFactory,
    ) {}

    private constructKey(tableId: string): string {
        return CachePrefixSuffix.GameTable + tableId;
    }
    
    public async createTable(dto: CreateGameTableDto): Promise<GameTableDto> {
        // if isPrivate and password is existing, no logic for it yet.
        const saveTableDb = await this.gameTableDbFactory.saveToDatabase(dto);
        const key = this.constructKey(saveTableDb.uuid);
        const gameTableDto = plainToClass(GameTableDto, saveTableDb);
        const gameTable = await this.gameTableRedisFactory.setGetJson(key, '$', gameTableDto);

        return gameTable;
    }

    public async deleteTable(tableId: string): Promise<void> {
        const key = this.constructKey(tableId);
        await this.gameTableRedisFactory.deleteInCache(key);
    }

    public async getTable(tableId: string): Promise<GameTableDto> {
        const key = this.constructKey(tableId);
        return await this.gameTableRedisFactory.getJson(key);
    }

    public async getRandomTable(): Promise<GameTableDto> {
        const key = await this.gameTableRedisFactory.getRandomTableKey();
        const gameTable = await this.gameTableRedisFactory.getJson(key);
        
        return gameTable;
    } 

    public async updateTable(tableId: string, dto: UpdateGameTableDto) {

    }
}
