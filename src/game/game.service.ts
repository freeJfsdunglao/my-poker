import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectionsService } from './connections/connections.service';
import { PlayersService } from './players/players.service';
import { ClientCreateGameTableDto } from './tables/dtos/client-create-game-table.dto';
import { GameTableDto } from './tables/dtos/game-table.dto';
import { JoinGameTableDto } from './tables/dtos/join-game-table.dto';
import { TablesService } from './tables/tables.service';

@Injectable()
export class GameService {
    constructor(
        private readonly tablesService: TablesService,
        private readonly connectionsService: ConnectionsService,
        private readonly playersService: PlayersService,
    ) {}
    
    public async playerJoinGameTable(client: Socket, dto: JoinGameTableDto): Promise<void> {
        /**
         * check if has id
         * if true:
         *      get game table
         * else:
         *      get random game table or create own game table
         */

        const gameTable = await this.tablesService.getTable(dto.uuid);
        await this.joinGame(client, gameTable);
    }

    public async playerCreateGameTable(client: Socket, dto: ClientCreateGameTableDto) {
        /**
         * create game table
         * join in game table
         */
        const gameTable = await this.tablesService.createTable(dto);
        await this.playersService.createTable(gameTable.uuid);
        await this.playersService.joinTable(gameTable.uuid, ) // CHECK THIS
        await this.joinGame(client, gameTable);
    }

    protected async joinGame(client: Socket, gameTable: GameTableDto) {
        /**
         * join socket room
         * broadcast join to room
         * check if can start
         */
        
        const roomName = gameTable.uuid;
        
        await this.connectionsService.joinRoom(client, gameTable.uuid);
        await this.connectionsService.sendToRoom('message', roomName, gameTable);
        await this.connectionsService.sendToRoom('message', roomName, 'sure ka na dian?');
    }
}
