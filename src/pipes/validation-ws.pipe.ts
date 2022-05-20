import { 
    Injectable, 
    ValidationError, 
    ValidationPipe as NestValidationPipe
} from "@nestjs/common";
import { ValidationWsException } from "src/exceptions/validation-ws.exception";


@Injectable()
export class ValidationWsPipe extends NestValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.map((err) => {
                    return {
                        column: err.property,
                        errors: err.constraints,
                    };
                });

                return new ValidationWsException(messages);
            }
        })
    }
}
