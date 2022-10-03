import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAppService } from '../../base/base-app.service';
import { TribeEntity } from './entity/tribe.entity';
import { TribeCreateDto } from './dto/tribe-create.dto';
import { RepositoryStateEnum } from '../repository/enum/repository.enum';

@Injectable()
export class TribeService extends BaseAppService<TribeEntity, TribeCreateDto> {
  constructor(
    @InjectRepository(TribeEntity)
    private readonly _tribeRepository: Repository<TribeEntity>,
  ) {
    super(_tribeRepository);
  }
}
