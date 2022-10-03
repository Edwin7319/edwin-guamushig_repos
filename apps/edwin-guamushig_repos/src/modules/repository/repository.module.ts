import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryEntity } from './entity/repository.entity';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity])],
  controllers: [RepositoryController],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
