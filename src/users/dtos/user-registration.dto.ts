import { Expose } from "class-transformer";
import { IsMobilePhone, IsString } from "class-validator";

import { Match } from "src/decorators/match.decorator";

export class UserRegistrationDto {
    @IsString()
    username: string;

    @IsString()
    @Expose()
    password: string;

    @IsString()
    @Match(UserRegistrationDto, o => o.password)
    confirmPassword: string;

    @IsString()
    fullName: string;

    @IsMobilePhone()
    phoneNumber: string;
}
