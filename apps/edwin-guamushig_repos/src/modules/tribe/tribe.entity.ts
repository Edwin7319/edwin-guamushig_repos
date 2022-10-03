import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

import { BaseAppEntity } from '../../base/base-app.entity';
import { OrganizationEntity } from '../organization/entity/organization.entity';
import { RepositoryEntity } from '../repository/repository.entity';

@Entity('tribe')
export class TribeEntity extends BaseAppEntity {
  @Column({
    name: 'name',
    type: 'char',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'status',
    type: 'int',
    nullable: false,
  })
  status: number;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.tribes, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_organization' })
  organization: OrganizationEntity;
  @RelationId((tribe: TribeEntity) => tribe.organization)
  organizationId: number;

  @OneToMany(() => RepositoryEntity, (repository) => repository.tribe)
  repositories: RepositoryEntity[];
}
