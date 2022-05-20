import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter } from "@nestjs/websockets";

import { LoggerService, LogLevel } from 'src/logger/logger.service';

@Catch()
export class AllWsExceptionsFilter extends BaseWsExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
    ) {
        super();
    }

    catch(exception: unknown, host: ArgumentsHost) {
        if (this.isExceptionObject(exception)) {
            this.logger.manualLoggingWithType({
                logLevel: LogLevel.ERROR,
                context: AllWsExceptionsFilter.name,
                message: exception.message,
                stack: exception.stack,
                metaData: { exception },
            });
        }
        
        super.catch(exception, host);
    }
}