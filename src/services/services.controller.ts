import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/profile.entity';
import { RequestWithUser } from 'src/commons/types/req-with-user.type';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles(Role.PROVIDER)
  create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() req: RequestWithUser,
  ) {
    const profile = req.user.profiles[0];
    return this.servicesService.create(createServiceDto, profile);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.servicesService.findAll(req.user.profiles[0].id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.PROVIDER)
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Req() req: RequestWithUser,
  ) {
    return this.servicesService.update(
      +id,
      updateServiceDto,
      req.user.profiles[0].id,
    );
  }

  @Delete(':id')
  @Roles(Role.PROVIDER)
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
