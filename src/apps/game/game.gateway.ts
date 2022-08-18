import { 
  UseFilters, 
  UseGuards, 
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

import { WEBSOCKET_GAME_NAMESPACE } from 'src/shared/common/constants';
import { LoggingWsInterceptor } from 'src/shared/interceptors/logging-ws.interceptor';
import { ValidationWsExceptionFilter } from 'src/shared/filters/validation-ws-exception.filter';
import { ValidationWsPipe } from 'src/shared/pipes/validation-ws.pipe';
import { GameService } from './game.service';
import { ClientCreateGameTableDto } from './tables/dtos/client-create-game-table.dto';
import { JoinGameTableDto } from './tables/dtos/join-game-table.dto';
import { AllWsExceptionsFilter } from 'src/shared/filters/all-ws-exception.filter';
import { JwtWsAuthGuard } from 'src/apps/auth/guards/jwt-ws-auth.guard';

const WEBSOCKET_OPTIONS = {
  transports: ['websocket'],
  serveClient: true,
  namespace: WEBSOCKET_GAME_NAMESPACE,
};

@UseGuards(JwtWsAuthGuard)
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

  // @Public() // <-- if open to the public.
  @SubscribeMessage('createGameTable')
  async handleClientCreateGameTable(client: Socket, dto: ClientCreateGameTableDto) {
    console.log('request', client.request);
    await this.gameService.playerCreateGameTable(client, dto);
  }
}
