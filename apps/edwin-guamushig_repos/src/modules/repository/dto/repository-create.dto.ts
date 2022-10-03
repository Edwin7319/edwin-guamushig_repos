import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../entity/repository.entity';
import { TribeEntity } from '../../tribe/entity/tribe.entity';

export class RepositoryCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIn([RepositoryStatusEnum.ACTIVE, RepositoryStatusEnum.INACTIVE])
  status: RepositoryStatusEnum;

  @IsNotEmpty()
  @IsIn([
    RepositoryStateEnum.ARCHIVE,
    RepositoryStateEnum.ENABLE,
    RepositoryStateEnum.DISABLE,
  ])
  state: RepositoryStateEnum;

  @IsOptional()
  @IsDate()
  createTime?: Date;

  @IsNotEmpty()
  tribe: Partial<TribeEntity>;
}
