import { Body, Controller, Post } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly usersService: UsersService,
    ) {}
    
    @Post('register')
    async register(@Body() dto: UserRegistrationDto) {
        this.loggerService.verbose('registration', UsersController.name, dto);
        await this.usersService.userCreate(dto);
    }
}
