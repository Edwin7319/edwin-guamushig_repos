import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAppService } from '../../base/base-app.service';
import { OrganizationEntity } from './entity/organization.entity';
import { OrganizationCreateDto } from './dto/organization-create.dto';

@Injectable()
export class OrganizationService extends BaseAppService<
  OrganizationEntity,
  OrganizationCreateDto
> {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly _organizationRepository: Repository<OrganizationEntity>,
  ) {
    super(_organizationRepository);
  }
}
