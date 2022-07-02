import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    
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
}
