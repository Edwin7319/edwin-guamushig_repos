import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationCreateDto } from './dto/organization-create.dto';
import { BaseAppController } from '../../base/base-app.controller';
import { OrganizationEntity } from './entity/organization.entity';
import { OrganizationUpdateDto } from './dto/organization-update.dto';

@Controller('organization')
export class OrganizationController extends BaseAppController<
  OrganizationEntity,
  OrganizationCreateDto
> {
  constructor(private readonly _organizationService: OrganizationService) {
    super(_organizationService);
  }

  @Post()
  async create(
    @Body() data: OrganizationCreateDto,
  ): Promise<OrganizationEntity> {
    return this._organizationService.create(data);
  }

  @Put(':id')
  async update(
    @Body() data: OrganizationUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrganizationEntity> {
    return this._organizationService.update(id, data);
  }
}
