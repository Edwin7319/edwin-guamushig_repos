import { IsInt, IsOptional, IsString } from 'class-validator';

export class TribeUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  @IsInt()
  organizationId: number;
}
