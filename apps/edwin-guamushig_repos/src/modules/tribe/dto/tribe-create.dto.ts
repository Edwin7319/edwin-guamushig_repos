import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { OrganizationEntity } from '../../organization/entity/organization.entity';

export class TribeCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  status: number;

  @IsNotEmpty()
  organization: Partial<OrganizationEntity>;
}
