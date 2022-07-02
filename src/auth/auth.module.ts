import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationsModule } from 'src/configurations/configurations.module';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { JWT_EXPIRATION } from 'src/common/constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigurationsService],
      useFactory: async (config: ConfigurationsService) => ({
        secret: config.jwtSecretKey,
        signOptions: { expiresIn: JWT_EXPIRATION },
      }),
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
