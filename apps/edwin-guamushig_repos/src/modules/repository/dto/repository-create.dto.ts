import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { TribeEntity } from '../../tribe/entity/tribe.entity';
import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../enum/repository.enum';

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
