import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from 'src/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
    ) {}
    
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const status = exception.getStatus();

        this.logger.manualLoggingWithType({
            logLevel: 'error',
            context: HttpExceptionsFilter.name,
            message: exception.message,
            stack: exception.stack,
            metaData: { request, response },
        });
        
        response.status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                reason: exception.message,
            });
    }
}