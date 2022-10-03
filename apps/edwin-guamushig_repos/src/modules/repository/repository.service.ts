import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAppService } from '../../base/base-app.service';
import { RepositoryEntity } from './entity/repository.entity';
import { RepositoryCreateDto } from './dto/repository-create.dto';

@Injectable()
export class RepositoryService extends BaseAppService<
  RepositoryEntity,
  RepositoryCreateDto
> {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly _repoRepository: Repository<RepositoryEntity>,
  ) {
    super(_repoRepository);
  }
}
