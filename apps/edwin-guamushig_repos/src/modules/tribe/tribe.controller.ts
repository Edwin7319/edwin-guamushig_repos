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
import { TribeEntity } from './entity/tribe.entity';
import { TribeCreateDto } from './dto/tribe-create.dto';
import { TribeService } from './tribe.service';
import { TribeUpdateDto } from './dto/tribe-update.dto';

@Controller('tribe')
export class TribeController extends BaseAppController<
  TribeEntity,
  TribeCreateDto
> {
  constructor(private readonly _tribeService: TribeService) {
    super(_tribeService);
  }

  @Post()
  async create(@Body() data: TribeCreateDto): Promise<TribeEntity> {
    return this._tribeService.create(data);
  }

  @Put(':id')
  async update(
    @Body() data: TribeUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TribeEntity> {
    return this._tribeService.update(id, data);
  }
}
