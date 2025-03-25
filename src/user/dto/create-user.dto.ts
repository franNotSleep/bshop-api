import { Role } from '../entities/profile.entity';

export class CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  role: Role;
}
