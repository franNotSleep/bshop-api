import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationType } from 'src/configuration/configuration.type';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { PasswordService } from './password.service';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService<ConfigurationType>) {
        return {
          secret: configService.get('auth.jwtSecret', { infer: true }),
          signOptions: {
            expiresIn: configService.get('auth.jwtExpirationTime', {
              infer: true,
            }),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JWTStrategy,
    PasswordService,
    JWTRefreshStrategy,
  ],
})
export class AuthModule {}
