import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {    
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        
        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Something went wrong.' });
    }
}