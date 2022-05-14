import { OmitType } from "@nestjs/mapped-types";
import { UserRegistrationDto } from "./user-registration.dto";

export class UserDto extends OmitType(
    UserRegistrationDto,
    [
        'password',
        'confirmPassword',
    ] as const
) {}