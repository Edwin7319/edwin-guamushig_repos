import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { RepositoryEntity } from '../../repository/entity/repository.entity';

export class MetricsUpdateDto {
  @IsOptional()
  @IsNumber()
  coverage?: number;

  @IsOptional()
  @IsInt()
  bugs?: number;

  @IsOptional()
  @IsInt()
  vulnerabilities?: number;

  @IsOptional()
  @IsInt()
  hotspot?: number;

  @IsOptional()
  @IsInt()
  codeSmells?: number;

  @IsOptional()
  repository?: Partial<RepositoryEntity>;
}
