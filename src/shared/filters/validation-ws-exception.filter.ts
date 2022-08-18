import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { EXCEPTION } from "src/shared/common/constants";
import { ValidationWsException } from "src/shared/exceptions/validation-ws.exception";

@Catch(ValidationWsException)
export class ValidationWsExceptionFilter extends BaseWsExceptionFilter {
    constructor() {
        super();
    }

    catch(exception: ValidationWsException, host: ArgumentsHost): void {
        const ws = host.switchToWs();
        const wsClient = ws.getClient();

        console.error(exception);

        return wsClient.emit(EXCEPTION, ...exception.validationErrors);
    }
}