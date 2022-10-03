import { getRepository, MigrationInterface } from 'typeorm';
import { OrganizationEntity } from '../modules/organization/entity/organization.entity';
import { TribeEntity } from '../modules/tribe/entity/tribe.entity';
import { RepositoryEntity } from '../modules/repository/entity/repository.entity';
import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../modules/repository/enum/repository.enum';
import { MetricsEntity } from '../modules/metrics/entity/metrics.entity';

export class AddTestData1664824332308 implements MigrationInterface {
  public async up(): Promise<void> {
    await Promise.all(
      ORGANIZATIONS.map((organization) =>
        getRepository(OrganizationEntity).save(organization),
      ),
    );
    await Promise.all(
      TRIBES.map((tribe) => getRepository(TribeEntity).save(tribe)),
    );
    await Promise.all(
      REPOSITORIES.map((repository) =>
        getRepository(RepositoryEntity).save(repository),
      ),
    );
    await Promise.all(
      METRICS.map((metric) => getRepository(MetricsEntity).save(metric)),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}

const ORGANIZATIONS = [
  {
    name: 'Organización 1',
    status: 200,
  },
  {
    name: 'Organización 2',
    status: 201,
  },
  {
    name: 'Organización 3',
    status: 201,
  },
];

const TRIBES = [
  {
    name: 'Tribu 1',
    status: 200,
    organization: {
      id: 1,
    },
  },
  {
    name: 'Tribu 2',
    status: 200,
    organization: {
      id: 1,
    },
  },
  {
    name: 'Tribu 3',
    status: 200,
    organization: {
      id: 2,
    },
  },
  {
    name: 'Tribu 4',
    status: 200,
    organization: {
      id: 2,
    },
  },
  {
    name: 'Tribu 5',
    status: 200,
    organization: {
      id: 3,
    },
  },
];

const REPOSITORIES = [
  {
    name: 'Repositorio 1',
    state: RepositoryStateEnum.ENABLE,
    status: RepositoryStatusEnum.ACTIVE,
    tribe: {
      id: 1,
    },
  },
  {
    name: 'Repositorio 2',
    state: RepositoryStateEnum.ENABLE,
    status: RepositoryStatusEnum.ACTIVE,
    tribe: {
      id: 1,
    },
  },
  {
    name: 'Repositorio 3',
    state: RepositoryStateEnum.ARCHIVE,
    status: RepositoryStatusEnum.INACTIVE,
    tribe: {
      id: 1,
    },
  },
  {
    name: 'Repositorio 4',
    state: RepositoryStateEnum.ARCHIVE,
    status: RepositoryStatusEnum.INACTIVE,
    tribe: {
      id: 2,
    },
  },
  {
    name: 'Repositorio 5',
    state: RepositoryStateEnum.DISABLE,
    status: RepositoryStatusEnum.INACTIVE,
    tribe: {
      id: 3,
    },
  },
];

const METRICS = [
  {
    coverage: 77,
    bugs: 1,
    vulnerabilities: 1,
    hotspot: 2,
    codeSmells: 2,
    repository: {
      id: 1,
    },
  },
  {
    coverage: 33,
    bugs: 1,
    vulnerabilities: 1,
    hotspot: 2,
    codeSmells: 2,
    repository: {
      id: 2,
    },
  },
  {
    coverage: 88,
    bugs: 1,
    vulnerabilities: 1,
    hotspot: 2,
    codeSmells: 2,
    repository: {
      id: 3,
    },
  },
];
