import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TribeEntity } from './entity/tribe.entity';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TribeEntity])],
  controllers: [TribeController],
  providers: [TribeService],
  exports: [],
})
export class TribeModule {}
