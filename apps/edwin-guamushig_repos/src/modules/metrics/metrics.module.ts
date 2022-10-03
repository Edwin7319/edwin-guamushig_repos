import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { MetricsEntity } from './entity/metrics.entity';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TribeEntity } from '../tribe/entity/tribe.entity';
import { SimulatedModule } from '../../gateway/simulated/simulated.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetricsEntity, TribeEntity]),
    SimulatedModule,
  ],
  controllers: [MetricsController],
  providers: [MetricsService, ConfigService],
  exports: [MetricsService],
})
export class MetricsModule {}
