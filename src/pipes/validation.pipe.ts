import { 
    Injectable, 
    ValidationError, 
    ValidationPipe as NestValidationPipe
} from "@nestjs/common";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe extends NestValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.map((err) => {
                    return {
                        column: err.property,
                        errors: err.constraints,
                    };
                });

                return new ValidationException(messages);
            }
        })
    }
}