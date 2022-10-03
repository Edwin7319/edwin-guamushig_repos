import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TribeCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  status: number;

  @IsNotEmpty()
  @IsInt()
  organizationId: number;
}
