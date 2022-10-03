import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { TribeEntity } from '../../tribe/entity/tribe.entity';
import { RepositoryEntity } from '../../repository/entity/repository.entity';
import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../../repository/enum/repository.enum';
import { MetricsEntity } from '../entity/metrics.entity';

export const DATA = {
  organization: {
    entity: OrganizationEntity,
    data: [
      {
        id: 1,
        name: 'Organization 1',
        status: 1,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Organization 2',
        status: 1,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
    ],
  },
  tribe: {
    entity: TribeEntity,
    data: [
      {
        id: 1,
        name: 'Tribe 1',
        status: 1,
        organization: {
          id: 1,
        },
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Tribe 2',
        status: 1,
        organization: {
          id: 2,
        },
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
    ],
  },
  repository: {
    entity: RepositoryEntity,
    data: [
      {
        id: 1,
        tribe: {
          id: 2,
        },
        name: 'Repository 1',
        state: RepositoryStateEnum.ENABLE,
        status: RepositoryStatusEnum.ACTIVE,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
      {
        id: 2,
        tribe: {
          id: 2,
        },
        name: 'Repository 2',
        state: RepositoryStateEnum.ARCHIVE,
        status: RepositoryStatusEnum.ACTIVE,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
    ],
  },
  metrics: {
    entity: MetricsEntity,
    data: [
      {
        id: 1,
        repository: {
          id: 1,
        },
        coverage: 22.33,
        bugs: 1,
        vulnerabilities: 2,
        codeSmells: 3,
        hotspot: 4,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
      {
        id: 2,
        repository: {
          id: 2,
        },
        coverage: 55.69,
        bugs: 2,
        vulnerabilities: 2,
        codeSmells: 2,
        hotspot: 9,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
    ],
  },
};
