import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDto } from "src/users/dtos/user.dto";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dtos/login.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<UserDto> {
        const loginInfo: LoginDto = { username, password };
        
        const user = this.authService.validateUser(loginInfo);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}