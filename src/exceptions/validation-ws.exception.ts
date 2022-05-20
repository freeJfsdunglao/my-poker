import { BadRequestException } from "@nestjs/common";

export class ValidationWsException extends BadRequestException {
    constructor(public validationErrors: Object[]) {
        super();
    }
}