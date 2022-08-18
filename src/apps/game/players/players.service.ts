import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Socket } from 'socket.io';
import { CachePrefixSuffix } from 'src/shared/common/constants';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayerDto } from './dtos/player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './entity/player.entity';
import { PlayerDbFactory } from './factories/player-db.factory';
import { PlayerRedisFactory } from './factories/player-redis.factory';

@Injectable()
export class PlayersService {
    constructor(
        private readonly playerDbFactory: PlayerDbFactory,
        private readonly playerRedisFactory: PlayerRedisFactory,
    ) {}

    private constructTablePlayerArrayKey(tableId: string): string {
        return CachePrefixSuffix.GameTable + tableId + CachePrefixSuffix.GameTablePlayers;
    }

    private constructPlayerSessionKey(uuid: string): string {
        return CachePrefixSuffix.PlayerSession + uuid;
    }

    public async saveToDb(dto: CreatePlayerDto): Promise<Player> {
        return await this.playerDbFactory.create(dto);
    }

    public async updateToDb(uuid: string, dto: UpdatePlayerDto): Promise<void> {
        return await this.playerDbFactory.update(uuid, dto);
    }

    public async createTable(tableId: string): Promise<void> {
        const key = this.constructTablePlayerArrayKey(tableId);
        await this.playerRedisFactory.createInitialGameTablePlayers(key);
    }

    public async joinTable(tableId: string, uuid: string): Promise<void> {
        const player = await this.playerDbFactory.fetch(uuid);
        const dto = plainToClass(PlayerDto, player);
        const playerTableKey = this.constructTablePlayerArrayKey(tableId);
        
        await this.playerRedisFactory.appendPlayer(playerTableKey, '$', dto);
    }

    public async getDbPlayerViaSocket(client: Socket) {
        console.log('player data', client);
        // return await this.playerDbFactory.fetch()
    }
}
