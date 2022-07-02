import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectionsService } from './connections/connections.service';
import { ClientCreateGameTableDto } from './tables/dtos/client-create-game-table.dto';
import { GameTableDto } from './tables/dtos/game-table.dto';
import { JoinGameTableDto } from './tables/dtos/join-game-table.dto';
import { TablesService } from './tables/tables.service';

@Injectable()
export class GameService {
    constructor(
        private readonly tablesService: TablesService,
        private readonly connectionsService: ConnectionsService,
    ) {}
    
    public async playerJoinGameTable(client: Socket, dto: JoinGameTableDto): Promise<void> {
        /**
         * check if has id
         * if true:
         *      get game table
         * else:
         *      get random game table or create own game table
         */
        
        // await this.connectionsService.joinGame(client, gameTable);
    }

    public async playerCreateGameTable(client: Socket, dto: ClientCreateGameTableDto) {
        /**
         * create game table
         * join in game table
         */
        const gameTable = await this.tablesService.createTable(dto);
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
    }
}
