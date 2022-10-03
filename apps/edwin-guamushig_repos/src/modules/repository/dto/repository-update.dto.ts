import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../entity/repository.entity';
import { TribeEntity } from '../../tribe/entity/tribe.entity';

export class RepositoryUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn([RepositoryStatusEnum.ACTIVE, RepositoryStatusEnum.INACTIVE])
  status?: RepositoryStatusEnum;

  @IsOptional()
  @IsIn([
    RepositoryStateEnum.ARCHIVE,
    RepositoryStateEnum.ENABLE,
    RepositoryStateEnum.DISABLE,
  ])
  state?: RepositoryStateEnum;

  @IsOptional()
  @IsDate()
  createTime?: Date;

  @IsOptional()
  tribe?: Partial<TribeEntity>;
}
