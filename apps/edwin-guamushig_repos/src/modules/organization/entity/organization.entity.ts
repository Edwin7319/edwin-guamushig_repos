import { Column, Entity, OneToMany } from 'typeorm';

import { BaseAppEntity } from '../../../base/base-app.entity';
import { TribeEntity } from '../../tribe/tribe.entity';

@Entity('organization')
export class OrganizationEntity extends BaseAppEntity {
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

  @OneToMany(() => TribeEntity, (tribe) => tribe.organization)
  tribes: TribeEntity[];
}
