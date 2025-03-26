import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Profile, Role } from 'src/user/entities/profile.entity';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  @Roles(Role.PROVIDER)
  create(dto: CreateServiceDto, profile: Profile) {
    const service = this.servicesRepository.create({
      name: dto.name,
      isRefundable: dto.is_refundable ?? false,
      price: dto.price,
      profile: profile,
    });

    return this.servicesRepository.save(service);
  }

  findAll(profileId?: number) {
    const where = profileId ? { profile: { id: profileId } } : {};
    return this.servicesRepository.find({
      where,
      relations: {
        appointments: true,
      },
    });
  }

  findOne(id: number) {
    return this.servicesRepository.findOne({ where: { id } });
  }

  update(id: number, updateServiceDto: UpdateServiceDto, profileId: number) {
    return this.servicesRepository.update(
      { id, profile: { id: profileId } },
      updateServiceDto,
    );
  }

  remove(id: number) {
    return this.servicesRepository.delete({ id });
  }
}
