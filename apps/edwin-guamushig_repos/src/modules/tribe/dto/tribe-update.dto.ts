import { IsInt, IsOptional, IsString } from 'class-validator';
import { OrganizationEntity } from '../../organization/entity/organization.entity';

export class TribeUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  organization: Partial<OrganizationEntity>;
}
