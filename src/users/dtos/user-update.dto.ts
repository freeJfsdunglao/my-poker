import { PartialType } from "@nestjs/mapped-types";
import { ValidateIf } from "class-validator";
import { Match } from "src/decorators/match.decorator";
import { UserRegistrationDto } from "./user-registration.dto";

export class UserUpdateDto extends PartialType(UserRegistrationDto) {
    @ValidateIf(o => o.password)
    @Match(UserUpdateDto, o => o.password)
    confirmPassword: string;
}