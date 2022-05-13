import { IsMobilePhone, IsString } from "class-validator";

export class UserRegistrationDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;

    @IsString()
    fullName: string;

    @IsMobilePhone()
    phoneNumber: string;
}
