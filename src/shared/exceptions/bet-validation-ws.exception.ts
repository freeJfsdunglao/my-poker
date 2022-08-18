import { BadRequestException } from "@nestjs/common";
import { ErrorCode } from "src/shared/common/constants";

export class BetValidationWsException extends BadRequestException {
    constructor(public reason: string, public errorCode: ErrorCode) {
        super();
    }
}