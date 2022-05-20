import { UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
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

const WEBSOCKET_OPTIONS = {
  transports: ['websocket'],
  serveClient: true,
  namespace: WEBSOCKET_GAME_NAMESPACE,
};

@UseFilters(new ValidationWsExceptionFilter())
@UsePipes(new ValidationWsPipe())
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
    private readonly connectionsService: ConnectionsService
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
}
