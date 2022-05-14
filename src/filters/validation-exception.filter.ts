import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ValidationException } from "src/exceptions/validation.exception";
import { LoggerService } from "src/logger/logger.service";

@Catch(ValidationException)
export class ValidationExceptionsFilter extends BaseExceptionFilter {
    constructor(
        private readonly logger: LoggerService
    ) {
        super();
    }

    catch(exception: ValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        this.logger.manualLoggingWithType({
            logLevel: 'error',
            context: ValidationExceptionsFilter.name,
            message: exception.message,
            stack: exception.stack,
            metaData: { exception },
        });

        return response.status(HttpStatus.BAD_REQUEST)
            .json({
                message: 'Validation Error',
                information: exception.validationErrors,
            })
    }
}