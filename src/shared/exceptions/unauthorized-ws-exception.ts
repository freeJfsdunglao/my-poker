import { UnauthorizedException } from "@nestjs/common";

export class UnauthorizedWsException extends UnauthorizedException {
    constructor() {
        super();
    }
}