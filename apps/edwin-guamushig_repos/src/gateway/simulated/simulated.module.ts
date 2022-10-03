import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SimulatedService } from './simulated.service';

@Module({
  imports: [HttpModule],
  providers: [SimulatedService],
  exports: [SimulatedService],
})
export class SimulatedModule {}
