import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user  = await this.usersService.findOneByUsername(username);

        if (user && user.password === password) {
            const { password, ...userData } = user;
            return userData;
        }

        return null;
    }
}
