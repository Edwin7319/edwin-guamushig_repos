import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrganizationUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  status?: number;
}
