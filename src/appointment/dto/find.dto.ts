import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  service_id: number;
}
