import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { BaseAppController } from '../../base/base-app.controller';
import { RepositoryEntity } from './entity/repository.entity';
import { RepositoryCreateDto } from './dto/repository-create.dto';
import { RepositoryService } from './repository.service';
import { RepositoryUpdateDto } from './dto/repository-update.dto';

@Controller('repository')
export class RepositoryController extends BaseAppController<
  RepositoryEntity,
  RepositoryCreateDto
> {
  constructor(private readonly _repositoryService: RepositoryService) {
    super(_repositoryService);
  }

  @Post()
  async create(@Body() data: RepositoryCreateDto): Promise<RepositoryEntity> {
    return this._repositoryService.create(data);
  }

  @Put(':id')
  async update(
    @Body() data: RepositoryUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RepositoryEntity> {
    return this._repositoryService.update(id, data);
  }
}
