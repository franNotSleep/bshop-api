import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationType } from 'src/configuration/configuration.type';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

export type JWTPayload = {
  userId: number;
};

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('auth.jwtSecret', { infer: true }),
    });
  }

  validate(payload: any) {
    return this.usersService.findById(payload.userId);
  }
}
