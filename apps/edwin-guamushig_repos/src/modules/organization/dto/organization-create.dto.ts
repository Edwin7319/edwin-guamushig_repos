import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class OrganizationCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  status: number;
}
