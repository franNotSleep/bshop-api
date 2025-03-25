import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationType } from 'src/configuration/configuration.type';
import { UserModule } from 'src/user/user.module';

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
  providers: [AuthService],
})
export class AuthModule {}
