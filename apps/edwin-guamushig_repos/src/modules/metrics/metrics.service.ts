import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAppService } from '../../base/base-app.service';
import { MetricsEntity } from './entity/metrics.entity';
import { MetricsCreateDto } from './dto/metrics-create.dto';

@Injectable()
export class MetricsService extends BaseAppService<
  MetricsEntity,
  MetricsCreateDto
> {
  constructor(
    @InjectRepository(MetricsEntity)
    private readonly _metricsRepository: Repository<MetricsEntity>,
  ) {
    super(_metricsRepository);
  }
}
