import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LoggerService } from "src/logger/logger.service";
import { TypeORMError } from "typeorm";

/**
 * Note: ALL Exception filters
 */
@Catch(TypeORMError)
export class TypeOrmExceptionsFilter extends BaseExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
    ) {
        super();
    }
    
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        this.logger.manualLoggingWithType({
            logLevel: 'error',
            context: TypeOrmExceptionsFilter.name,
            message: exception.message,
            stack: exception.stack,
            metaData: { exception },
        });

        response.status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Something went wrong.' });
    }
}