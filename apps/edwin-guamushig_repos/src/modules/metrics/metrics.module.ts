import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetricsEntity } from './metrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetricsEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MetricsModule {}
