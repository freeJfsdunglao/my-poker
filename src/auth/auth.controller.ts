import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/constants';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Get()
    async samplePublic(): Promise<Array<string>> {
        return [];
    }

    @Get('roles')
    @Roles(Role.Admin)
    async roleGuarded(): Promise<string> {
        return 'Role Guarded';
    }
}
