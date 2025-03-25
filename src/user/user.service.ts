import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRespository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRespository.create(createUserDto);
    await this.usersRespository.save(user);
    const profile = this.profilesRepository.create({
      user,
      role: createUserDto.role,
    });
    await this.profilesRepository.save(profile);

    return user.id;
  }

  async findByEmail(email: string) {
    return this.usersRespository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.usersRespository.findOne({ where: { id } });
  }
}
