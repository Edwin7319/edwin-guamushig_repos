import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { TribeEntity } from '../tribe/tribe.entity';

import { BaseAppEntity } from '../../base/base-app.entity';
import { MetricsEntity } from '../metrics/metrics.entity';

export enum RepositoryStateEnum {
  ENABLE = 'E',
  DISABLE = 'D',
  ARCHIVE = 'A',
}

export enum RepositoryStatusEnum {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

@Entity('repository')
export class RepositoryEntity extends BaseAppEntity {
  @Column({
    name: 'name',
    type: 'char',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'state',
    type: 'char',
    length: 1,
    nullable: false,
  })
  state: RepositoryStateEnum;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
    nullable: false,
  })
  status: RepositoryStatusEnum;

  @ManyToOne(() => TribeEntity, (tribe) => tribe.repositories, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_tribe' })
  tribe: TribeEntity;
  @RelationId((repository: RepositoryEntity) => repository.tribe)
  tribeId: number;

  @OneToOne(() => MetricsEntity, (metrics) => metrics.repository)
  metrics: MetricsEntity;
}
