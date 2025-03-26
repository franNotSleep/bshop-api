import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  exports: [NotificationsGateway],
  providers: [NotificationsGateway, NotificationsService, JwtService],
})
export class NotificationsModule {}
