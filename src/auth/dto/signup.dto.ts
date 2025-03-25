import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from 'src/user/entities/profile.entity';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
