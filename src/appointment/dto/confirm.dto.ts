import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  appointment_id: number;
}
