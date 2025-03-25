import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_refundable: boolean;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
