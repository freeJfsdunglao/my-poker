import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { 
    INITIAL_WEBSOCKET_ROOMS, 
    WEBSOCKET_GAME_NAMESPACE,
    WS_EXCEPTION_NO_SERVER, 
} from 'src/common/constants';

@Injectable()
export class ConnectionsService {
    private _server: Server;

    get server(): Server {
        if (!this._server) {
            throw new WsException(WS_EXCEPTION_NO_SERVER);
        }
        
        return this._server;
    }

    set server(value: Server) {
        this._server = value;
    }

    get gameNamespace(): Namespace {
        return this.server.of(WEBSOCKET_GAME_NAMESPACE);
    }

    async purge() {
        this.gameNamespace.disconnectSockets();
    }

    async kickUserConnection(socketId: string) {
        this.gameNamespace.to(socketId).disconnectSockets();
    }
    
    async joinRoom(client: Socket, roomName: string) {
        await client.join(roomName);
    }

    async leaveRoom(client: Socket, roomName: string) {
        await client.leave(roomName);
    }

    async kickUsersInRoom(roomName: string) {
        this.gameNamespace.in(roomName).socketsLeave(roomName);
    }

    async rejoinUsersToAnotherRoom(oldRoomName: string, newRoomName: string) {
        this.gameNamespace.in(oldRoomName).socketsJoin(newRoomName);
        this.gameNamespace.in(newRoomName).socketsLeave(oldRoomName);
    }

    async joinInitialRooms(client: Socket) {
        await this.joinRoom(client, INITIAL_WEBSOCKET_ROOMS.NOTIFICATIONS);
    }

    async getAllSockets() {
        return await this.gameNamespace.fetchSockets();
    }

    async getRoomSockets(roomName: string) {
        return await this.gameNamespace.in(roomName).fetchSockets();
    }

    async sendToUser(socketId: string, eventName: string, dto: any) {
        this.gameNamespace.to(socketId).emit(eventName, dto);
    }

    async sendToAllUsers(eventName: string, dto: any) {
        this.gameNamespace.emit(eventName, dto);
    }

    async sendToRoom(eventName: string, roomName: string|string[], dto: any) {
        this.gameNamespace.to(roomName).emit(eventName, dto);
    }
    
    async onUserConnect(client: Socket, ...args: any[]) {
        await this.joinInitialRooms(client);
        client.emit('PING', 'PONG');
    }

    async onUserDisconnect(client: Socket) {
        return client;
    }
}
