import { Body, Controller, Post } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationCreateDto } from './dto/organization-create.dto';
import { BaseAppController } from '../../base/base-app.controller';
import { OrganizationEntity } from './entity/organization.entity';

@Controller('organization')
export class OrganizationController extends BaseAppController<
  OrganizationEntity,
  OrganizationCreateDto
> {
  constructor(private readonly _organizationService: OrganizationService) {
    super(_organizationService);
  }

  @Post()
  async createFake(@Body() data: OrganizationCreateDto) {
    console.log(data);
    return this._organizationService.create(data);
  }
}
