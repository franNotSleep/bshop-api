import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigurationType } from '../../configuration/configuration.type';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('auth.jwtRefreshSecret', {
        infer: true,
      }),
      passReqToCallback: true,
    });
  }

  validate(payload: any) {
    return this.authService.refreshToken(payload.userId);
  }
}
