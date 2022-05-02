import { ArgumentsHost, Catch, HttpServer } from "@nestjs/common";
import { AbstractHttpAdapter, BaseExceptionFilter } from "@nestjs/core";

import { LoggerService } from 'src/logger/logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
    ) {
        super();
    }

    catch(exception: unknown, host: ArgumentsHost) {
        if (this.isExceptionObject(exception)) {
            this.logger.manualLoggingWithType({
                logLevel: 'error',
                context: AllExceptionsFilter.name,
                message: exception.message,
                stack: exception.stack,
                metaData: { exception },
            });
        }
        
        super.catch(exception, host);
    }

    handleUnknownError(
        exception: any, 
        host: ArgumentsHost, 
        applicationRef: HttpServer<any, any> | AbstractHttpAdapter<any, any, any>
    ): void {
        this.logger.manualLoggingWithType({
            logLevel: 'error',
            context: AllExceptionsFilter.name,
            message: `Exception Type: ${typeof exception}, handleUnknownError is fired.`,
            metaData: { exception },
        });

        super.handleUnknownError(exception, host, applicationRef);
    }
}