import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong.' });
    }
}