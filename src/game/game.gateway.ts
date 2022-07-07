import { 
  UseFilters, 
  UseInterceptors, 
  UsePipes, 
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectionsService } from './connections/connections.service';

import { WEBSOCKET_GAME_NAMESPACE } from 'src/common/constants';
import { LoggingWsInterceptor } from 'src/interceptors/logging-ws.interceptor';
import { ValidationWsExceptionFilter } from 'src/filters/validation-ws-exception.filter';
import { ValidationWsPipe } from 'src/pipes/validation-ws.pipe';
import { GameService } from './game.service';
import { ClientCreateGameTableDto } from './tables/dtos/client-create-game-table.dto';
import { JoinGameTableDto } from './tables/dtos/join-game-table.dto';
import { AllWsExceptionsFilter } from 'src/filters/all-ws-exception.filter';

const WEBSOCKET_OPTIONS = {
  transports: ['websocket'],
  serveClient: true,
  namespace: WEBSOCKET_GAME_NAMESPACE,
};

@UseFilters(new AllWsExceptionsFilter(),new ValidationWsExceptionFilter())
@UsePipes(new ValidationWsPipe(), new NestValidationPipe({ transform: true }))
@UseInterceptors(LoggingWsInterceptor)
@WebSocketGateway(WEBSOCKET_OPTIONS)
export class GameGateway 
implements 
  OnGatewayConnection, 
  OnGatewayDisconnect,
  OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly connectionsService: ConnectionsService,
    private readonly gameService: GameService,
  ) {}

  afterInit(server: Server) {
    this.connectionsService.server = server;
  }
  
  async handleConnection(client: Socket, ...args: any[]) {
    await this.connectionsService.onUserConnect(client, ...args);
  }

  async handleDisconnect(client: Socket) {
    await this.connectionsService.onUserDisconnect(client);
  }
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('joinGameTable')
  async handleJoinGameTable(client: Socket, dto: JoinGameTableDto): Promise<void> {
    await this.gameService.playerJoinGameTable(client, dto);
  }

  @SubscribeMessage('createGameTable')
  async handleClientCreateGameTable(client: Socket, dto: ClientCreateGameTableDto) {
    await this.gameService.playerCreateGameTable(client, dto);
  }
}
