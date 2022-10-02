import { Column, Entity, OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';

import { BaseAppEntity } from '../../base/base-app.entity';
import { RepositoryEntity } from '../repository/repository.entity';

@Entity('metrics')
export class MetricsEntity extends BaseAppEntity {
  @Column({
    name: 'coverage',
    type: 'decimal',
    nullable: false,
  })
  coverage: number;

  @Column({
    name: 'bugs',
    type: 'int',
    nullable: false,
  })
  bugs: number;

  @Column({
    name: 'vulnerabilities',
    type: 'int',
    nullable: false,
  })
  vulnerabilities: number;

  @Column({
    name: 'hotspot',
    type: 'int',
    nullable: false,
  })
  hotspot: number;

  @Column({
    name: 'code_smells',
    type: 'int',
    nullable: false,
  })
  codeSmells: number;

  @OneToOne(() => RepositoryEntity, (repository) => repository.metrics, {
    eager: true,
  })
  repository: RepositoryEntity;
  // @RelationId((metrics: MetricsEntity) => metrics.repository)
  // idRepository: number;
}
