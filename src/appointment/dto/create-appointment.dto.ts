import {
  IsCreditCard,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PaymentMethod } from 'src/invoice/entities/invoice.entity';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  starts_at: Date;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsOptional()
  @IsCreditCard()
  card: string;

  @IsNumber()
  @IsNotEmpty()
  service_id: number;
}
