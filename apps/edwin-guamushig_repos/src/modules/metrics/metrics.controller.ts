import { Controller } from '@nestjs/common';

import { BaseAppController } from '../../base/base-app.controller';
import { MetricsEntity } from './entity/metrics.entity';
import { MetricsCreateDto } from './dto/metrics-create.dto';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController extends BaseAppController<
  MetricsEntity,
  MetricsCreateDto
> {
  constructor(private readonly _metricsService: MetricsService) {
    super(_metricsService);
  }
}
