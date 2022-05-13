import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    async validateUser(username: string, password: string): Promise<UserDto> {
        const user  = await this.usersService.findOneByUsername(username);

        if (user && user.password === password) {
            const { password, ...userData } = user;
            return userData;
        }

        return null;
    }
}
