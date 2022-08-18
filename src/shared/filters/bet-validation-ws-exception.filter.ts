import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { EXCEPTION } from "src/shared/common/constants";
import { BetValidationWsException } from "src/shared/exceptions/bet-validation-ws.exception";

@Catch(BetValidationWsException)
export class BetValidationWsExceptionFilter extends BaseWsExceptionFilter {
    constructor() {
        super();
    }

    catch(exception: BetValidationWsException, host: ArgumentsHost): void {
        const ws = host.switchToWs();
        const wsClient = ws.getClient();

        return wsClient.emit(
            EXCEPTION, 
            {
                error: exception.errorCode,
                reason: exception.reason,
            }
        );
    }
}