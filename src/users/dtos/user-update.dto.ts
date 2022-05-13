import { PartialType } from "@nestjs/mapped-types";
import { Equals, IsString, ValidateIf } from "class-validator";
import { UserRegistrationDto } from "./user-registration.dto";


export class UserUpdateDto extends PartialType(UserRegistrationDto) {
    @ValidateIf(o => o.password)
    @Equals(o => o.password)
    confirmPassword: string;
}