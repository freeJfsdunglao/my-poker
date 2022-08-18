import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { ErrorCode, EXCEPTION } from "src/shared/common/constants";

@Catch()
export class AllWsExceptionsFilter extends BaseWsExceptionFilter {
    constructor() {
        super();
    }

    catch(exception: unknown, host: ArgumentsHost) {
        console.error(exception);
        
        const ws = host.switchToWs();
        const wsClient = ws.getClient();

        return wsClient.emit(
            EXCEPTION, 
            {
                error: ErrorCode.SYSTEM_ERROR,
                reason: 'Internal Server Error.',
            }
        );
    }
}