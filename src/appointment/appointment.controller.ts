import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/profile.entity';
import { RequestWithUser } from 'src/commons/types/req-with-user.type';
import { ConfirmDto } from './dto/confirm.dto';
import { FindDto } from './dto/find.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Roles(Role.CLIENT)
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.appointmentService.create(
      createAppointmentDto,
      req.user.profiles[0],
    );
  }

  @Get()
  findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    dto: FindDto,
    @Req() req: RequestWithUser,
  ) {
    return this.appointmentService.findAll(
      dto.service_id,
      req.user.profiles[0].id,
    );
  }

  @Patch('confirm')
  confirm(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    dto: ConfirmDto,
    @Req() req: RequestWithUser,
  ) {
    return this.appointmentService.confirm(
      dto.appointment_id,
      req.user.profiles[0],
    );
  }

  @Patch('cancel')
  cancel(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    dto: ConfirmDto,
    @Req() req: RequestWithUser,
  ) {
    return this.appointmentService.cancel(
      dto.appointment_id,
      req.user.profiles[0],
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
