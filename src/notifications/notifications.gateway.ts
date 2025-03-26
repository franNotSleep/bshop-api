import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JWTPayload, JWTStrategy } from 'src/auth/strategies/jwt.strategy';
import { ConfigurationType } from 'src/configuration/configuration.type';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token;
    if (!token || typeof token !== 'string') {
      throw new WsException('Unauthorized');
    }

    const strategy = new JWTStrategy(this.configService, this.usersService);
    const payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
      secret: this.configService.getOrThrow('auth.jwtSecret', { infer: true }),
    });
    const user = await strategy.validate(payload);
    if (!user) {
      throw new WsException('Unauthorized');
    }
  }

  emitConfirmedAppointment(appointment: Appointment) {
    this.server.emit('confirmed-appointment', appointment);
  }

  emitConfirmAppointment(appointment: Appointment) {
    this.server.emit('confirm-appointment', appointment);
  }
}
