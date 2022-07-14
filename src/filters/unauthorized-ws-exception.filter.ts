import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { EXCEPTION } from "src/common/constants";
import { UnauthorizedWsException } from "src/exceptions/unauthorized-ws-exception";

@Catch(UnauthorizedWsException)
export class UnauthorizedWsExceptionFilter extends BaseWsExceptionFilter {
    constructor() {
        super();
    }

    catch(exception: UnauthorizedWsException, host: ArgumentsHost): void {
        const ws = host.switchToWs();
        const wsClient = ws.getClient();

        console.error(exception);

        return wsClient.emit(EXCEPTION, {
            code: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
        });
    }
}