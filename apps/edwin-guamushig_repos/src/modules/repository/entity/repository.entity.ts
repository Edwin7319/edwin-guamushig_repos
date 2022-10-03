import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { TribeEntity } from '../../tribe/entity/tribe.entity';

import { BaseAppEntity } from '../../../base/base-app.entity';
import { MetricsEntity } from '../../metrics/entity/metrics.entity';
import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../enum/repository.enum';

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

  @Column({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date = new Date();

  @ManyToOne(() => TribeEntity, (tribe) => tribe.repositories, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_tribe' })
  tribe: TribeEntity;
  @RelationId((repository: RepositoryEntity) => repository.tribe)
  tribeId: number;

  @OneToMany(() => MetricsEntity, (metrics) => metrics.repository)
  metrics: MetricsEntity[];
}
