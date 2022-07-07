import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CachePrefix } from 'src/common/constants';
import { CreateGameTableDto } from './dtos/create-game-table.dto';
import { GameTableDto } from './dtos/game-table.dto';
import { UpdateGameTableDto } from './dtos/update-game-table.dto';
import { GameTableFactory } from './factories/game-table.factory';

@Injectable()
export class TablesService {
    constructor(
        private readonly gameTableFactory: GameTableFactory,
    ) {}
    
    get defaultTable(): GameTableDto {
        return this.gameTableFactory.create({});
    }

    private constructKey(tableId: string): string {
        return CachePrefix.GameTable + tableId;
    }
    
    public async createTable(dto: CreateGameTableDto): Promise<GameTableDto> {
        const saveTableDb = await this.gameTableFactory.saveToDatabase(dto);
        const key = this.constructKey(saveTableDb.uuid);
        const gameTableDto = plainToClass(GameTableDto, saveTableDb);
        const gameTable = await this.gameTableFactory.setGetJson(key, '$', gameTableDto);

        return gameTable;
    }

    public async deleteTable(tableId: string): Promise<void> {
        const key = this.constructKey(tableId);
        await this.gameTableFactory.deleteInCache(key);
    }

    public async getTable(tableId: string): Promise<GameTableDto> {
        const key = this.constructKey(tableId);
        return await this.gameTableFactory.getJson(key);
    }

    public async getRandomTable(): Promise<GameTableDto> {
        const key = await this.gameTableFactory.getRandomTableKey();
        const gameTable = await this.gameTableFactory.getJson(key);
        
        return gameTable;
    } 

    public async updateTable(tableId: string, dto: UpdateGameTableDto) {

    }
}
