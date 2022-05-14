import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    password: string;
} 