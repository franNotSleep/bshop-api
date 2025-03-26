import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { JWTPayload, JWTStrategy } from 'src/auth/strategies/jwt.strategy';
import { ConfigurationType } from 'src/configuration/configuration.type';
import { UserService } from 'src/user/user.service';

type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;

export const AuthWsMiddleware = (
  jwtService: JwtService,
  configService: ConfigService<ConfigurationType>,
  userService: UserService,
): SocketMiddleware => {
  return async (socket: Socket, next) => {
    try {
      const token = socket.handshake?.auth?.token;

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      let payload: JWTPayload | null = null;

      try {
        payload = await jwtService.verifyAsync<JWTPayload>(token);
      } catch (error) {
        throw new Error('Authorization token is invalid');
      }

      const strategy = new JWTStrategy(configService, userService);
      const user = await strategy.validate(payload);

      if (!user) {
        throw new Error('User does not exist');
      }

      socket = Object.assign(socket, {
        user: user!,
      });
      next();
    } catch (error) {
      next(new Error('Unauthorized'));
    }
  };
};
