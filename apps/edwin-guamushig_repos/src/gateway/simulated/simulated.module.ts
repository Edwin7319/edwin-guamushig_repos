import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { SimulatedService } from './simulated.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SimulatedService],
  exports: [SimulatedService],
})
export class SimulatedModule {}
