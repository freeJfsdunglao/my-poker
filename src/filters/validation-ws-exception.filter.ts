import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { ValidationWsException } from "src/exceptions/validation-ws.exception";

@Catch(ValidationWsException)
export class ValidationWsExceptionFilter extends BaseWsExceptionFilter {
    constructor() {
        super()
    }

    catch(exception: ValidationWsException, host: ArgumentsHost): void {
        const ws = host.switchToWs();
        const wsClient = ws.getClient();

        return wsClient.emit('exception', ...exception.validationErrors);
    }
}