import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(dto: LoginDto): Promise<UserDto> {
        const user  = await this.usersService.findOneByUsername(dto.username);

        if (user && user.password === dto.password) {
            const { password, ...userData } = user;
            return userData;
        }

        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId,
        }

        return { access_token: this.jwtService.sign(payload) };
    }
}
