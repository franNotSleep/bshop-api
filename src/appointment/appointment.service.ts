import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesService } from 'src/services/services.service';
import { Profile } from 'src/user/entities/profile.entity';
import { Invoice, PaymentMethod } from 'src/invoice/entities/invoice.entity';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Invoice)
    private readonly invoicesRepository: Repository<Invoice>,
    private readonly servicesService: ServicesService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(dto: CreateAppointmentDto, profile: Profile) {
    const service = await this.servicesService.findOne(dto.service_id);
    if (!service) {
      throw new BadRequestException('invalid service');
    }

    const appointment = {
      service,
      profile,
      startsAt: dto.starts_at,
    } as Appointment;

    switch (dto.payment_method) {
      case PaymentMethod.CASH:
        // notify
        this.notificationsGateway.emitConfirmAppointment(appointment);
        break;
      case PaymentMethod.TRANSFER:
        const invoice = this.invoicesRepository.create({
          paymentMethod: PaymentMethod.TRANSFER,
          profile,
          service,
          paidAt: new Date(),
          amountPaid: service.price,
        });

        const { id } = await this.invoicesRepository.save(invoice);
        appointment.confirmedAt = new Date();
        invoice.id = id;
        appointment.invoice = {
          id: invoice.id,
          amountPaid: invoice.amountPaid,
          card: invoice.card,
          paymentMethod: invoice.paymentMethod,
          paidAt: invoice.paidAt
        } as Invoice;

        this.notificationsGateway.emitConfirmedAppointment(appointment);
        break;
    }
    return this.appointmentsRepository.save(appointment);
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
