import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { ServicesModule } from 'src/services/services.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Invoice]),
    ServicesModule,
    InvoiceModule,
    NotificationsModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
