import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationsModule } from 'src/configurations/configurations.module';
import { ConfigurationsService } from 'src/configurations/configurations.service';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigurationsService],
      useFactory: async (config: ConfigurationsService) => ({
        secret: config.jwtSecretKey,
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
