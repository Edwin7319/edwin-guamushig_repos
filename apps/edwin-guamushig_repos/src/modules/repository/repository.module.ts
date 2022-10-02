import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryEntity } from './repository.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RepositoryModule {}
