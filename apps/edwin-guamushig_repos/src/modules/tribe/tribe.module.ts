import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TribeEntity } from './tribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TribeEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TribeModule {}
