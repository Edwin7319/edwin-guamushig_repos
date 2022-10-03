import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { BaseAppController } from '../../base/base-app.controller';
import { MetricsEntity } from './entity/metrics.entity';
import { MetricsCreateDto } from './dto/metrics-create.dto';
import { MetricsService } from './metrics.service';
import { MetricsUpdateDto } from './dto/metrics-update.dto';
import { RepositoryMetricsResponseDto } from './dto/repository-metrics-response.dto';

@Controller('metrics')
export class MetricsController extends BaseAppController<
  MetricsEntity,
  MetricsCreateDto
> {
  constructor(private readonly _metricsService: MetricsService) {
    super(_metricsService);
  }

  @Post()
  async create(@Body() data: MetricsCreateDto): Promise<MetricsEntity> {
    return this._metricsService.create(data);
  }

  @Put(':id')
  async update(
    @Body() data: MetricsUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MetricsEntity> {
    return this._metricsService.update(id, data);
  }

  @Get('tribe/:id')
  async getRepositoryMetrics(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RepositoryMetricsResponseDto> {
    return this._metricsService.getRepositoryMetrics(id);
  }
}
