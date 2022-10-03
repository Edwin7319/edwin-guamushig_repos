import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { RepositoryEntity } from '../../repository/entity/repository.entity';

export class MetricsCreateDto {
  @IsNotEmpty()
  @IsNumber()
  coverage: number;

  @IsNotEmpty()
  @IsInt()
  bugs: number;

  @IsNotEmpty()
  @IsInt()
  vulnerabilities: number;

  @IsNotEmpty()
  @IsInt()
  hotspot: number;

  @IsNotEmpty()
  @IsInt()
  codeSmells: number;

  @IsNotEmpty()
  repository: Partial<RepositoryEntity>;
}
