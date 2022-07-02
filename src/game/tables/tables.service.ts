import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { ErrorCode } from 'src/common/constants';
import { UuidGeneratorService } from 'src/randomizer/uuid-generator/uuid-generator.service';
import { Repository } from 'typeorm';
import { ClientCreateGameTableDto } from './dtos/client-create-game-table.dto';
import { CreateGameTableDto } from './dtos/create-game-table.dto';
import { GameTableDto } from './dtos/game-table.dto';
import { UpdateGameTableDto } from './dtos/update-game-table.dto';
import { GameTable } from './entities/game-table.entity';
import { GameTableFactory } from './factories/game-table.factory';

@Injectable()
export class TablesService {
    constructor(
        private readonly gameTableFactory: GameTableFactory,
        @InjectRepository(GameTable)
        private readonly gameTableRepository: Repository<GameTable>,
        private readonly uuidGenetorService: UuidGeneratorService,
    ) {}
    
    get defaultTable(): GameTableDto {
        return this.gameTableFactory.create({});
    }

    private async _verifyUuid(tableId: string): Promise<boolean> {
        if (!tableId) {
            throw new WsException(ErrorCode.UUID_NOT_GENERATED);
        }
        
        const existing = await this.gameTableRepository.findOne({ 
            select: ['id'],
            where: { uuid: tableId },
        });

        if (existing) {
            return false;
        }

        return true;
    }

    private async _generateUuid(): Promise<string> {
        let isValid = false;
        let generatedUuid = '';
        
        do {
            generatedUuid = this.uuidGenetorService.generate();
            isValid = await this._verifyUuid(generatedUuid);
        } while (isValid === false)

        return generatedUuid;
    }

    private constructKey(tableId: string): string {
        return `game:${tableId}`;
    }
    
    public async createTable(dto: CreateGameTableDto): Promise<GameTableDto> {
        const uuid = await this._generateUuid();
        const key = this.constructKey(uuid);
        dto.uuid = uuid;
        
        await this.gameTableFactory.saveToDatabase(dto);
        await this.gameTableFactory.saveToRedis(key, dto);

        const gameTable = await this.gameTableFactory.fetchCached(key);
        
        return gameTable;
    }

    public async deleteTable(tableId: string) {

    }

    public async getTable(tableId: string) {

    }

    /* 
    public async getRandomTable(): Promise<GameTableDto> {
        return 
    } 
    */

    public async updateTable(tableId: string, dto: UpdateGameTableDto) {

    }
}
