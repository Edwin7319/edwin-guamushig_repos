import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BaseAppService } from './base-app.service';

@Controller()
export class BaseAppController<Entity, CreateDto, UpdateDto> {
  protected readonly _service: BaseAppService<Entity>;

  constructor(_service: BaseAppService<Entity>) {
    this._service = _service;
  }

  @Post()
  async create(@Body() data: CreateDto): Promise<Entity> {
    return this._service.create(data as any as Entity);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDto,
  ): Promise<void> {
    return this._service.update(id, data as any);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Entity> {
    return this._service.findById(id);
  }

  @Get()
  async findAll(): Promise<[Entity[], number]> {
    return await this._service.findAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._service.delete(id);
  }
}
