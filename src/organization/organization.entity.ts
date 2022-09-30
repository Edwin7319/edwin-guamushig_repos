import { Entity } from 'typeorm';
import { BaseAppEntity } from '../base/base-app.entity';

@Entity('organization')
export class OrganizationEntity extends BaseAppEntity {}
