import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BaseAppService } from './base-app.service';

@Controller()
export class BaseAppController<Entity, CreateDto> {
  protected readonly _service: BaseAppService<Entity, CreateDto>;

  constructor(_service: BaseAppService<Entity, CreateDto>) {
    this._service = _service;
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
